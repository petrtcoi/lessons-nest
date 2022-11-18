import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { Model } from 'mongoose'

import { Project, ProjectDocument } from '../src/entities/project/schemas/project.schema'
import { Currency, CurrencyDocument } from '../src/entities/currency/schemas/currency.schema'

import * as samples from './fixtures/projects'
import oauthToken from './fixtures/oauthTokean'
import { getModelToken, } from '@nestjs/mongoose'

import { DefaultCurrency } from '../src/entities/currency/enums/defaultCurrency.enum'
import { DefaultRates } from '../src/entities/currency/enums/defayultRates.enum'
import { UpdateProjectDto } from '../src/entities/project/dto/updateProject.dto'
import { Store, StoreDocument } from '../src/entities/store/schemas/store.schema'

import mongoose from 'mongoose'



describe('Project', () => {
    let app: INestApplication
    let projectModel: Model<ProjectDocument>
    let currencyModel: Model<CurrencyDocument>
    let storeModel: Model<StoreDocument>


    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        app = moduleFixture.createNestApplication()
        await app.init()
        app.useLogger(new Logger('PROJECT_TEST'))

        projectModel = moduleFixture.get<Model<ProjectDocument>>(getModelToken(Project.name))
        currencyModel = moduleFixture.get<Model<CurrencyDocument>>(getModelToken(Currency.name))
        storeModel = moduleFixture.get<Model<StoreDocument>>(getModelToken(Store.name))


        await Promise.all([
            projectModel.deleteMany({}),
            currencyModel.deleteOne({ name: DefaultCurrency.DEFAULT_PROJECT_EURO }),
            currencyModel.deleteOne({ name: DefaultCurrency.VARMANN })
        ])
    })

    afterAll(async () => {
        await app.close()
    })


    test('Add new project with correct user and default store and currencies + 1st default version', async () => {

        const response = await request(app.getHttpServer())
            .post('/project')
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ title: samples.one.title })
            .expect(200)

        const project = response.body
        expect(project.title).toBe(samples.one.title)
        expect(project.description).toBe("")

        const dbProject = await projectModel.findOne({ _id: project.id }).populate('manager').populate('store').populate('versions')
        expect(dbProject).not.toBeNull()
        expect(dbProject?.manager.name).toBe("Петр Цой")
        expect(dbProject?.store.code).toBe('zehnders')
        expect(dbProject?.currencies.eur).toBe(DefaultRates.EUR)
        expect(dbProject?.currencies.varmann).toBe(DefaultRates.VARMANN)
        expect(dbProject?.versions?.length).toBe(1)
    })


    test('Dont allow create project with duplicate title', async () => {
        await request(app.getHttpServer())
            .post('/project')
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ title: samples.one.title })
            .expect(400)
    })

    test('Get default rates from DB', async () => {
        await currencyModel.create({ name: DefaultCurrency.DEFAULT_PROJECT_EURO, rate: 88 })
        await currencyModel.create({ name: DefaultCurrency.VARMANN, rate: 95 })
        const response = await request(app.getHttpServer())
            .post('/project')
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ title: samples.three.title })
            .expect(200)
        expect(response.body.currencies.eur).toBe(88)
        expect(response.body.currencies.varmann).toBe(95)
    })

    test('Update project works', async () => {

        const oldProject = await projectModel.findOne({})
        const someStore = await storeModel.findOne({_id: {$ne: oldProject.store}})

        const updates: UpdateProjectDto = {
            title: 'Some new title',
            description: "some new description",
            currencies: { eur: 900, varmann: 1000 },
            store: someStore._id.toString()
        }

        await request(app.getHttpServer())
            .patch(`/project/${oldProject._id}`)
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send(updates)
            .expect(200)
        const updatedProject = await projectModel.findOne({ _id: oldProject._id })
      

        expect(updatedProject.title).toBe(updates.title)
        expect(updatedProject.description).toBe(updates.description)
        expect(updatedProject.currencies.eur).toBe(updates.currencies.eur)
        expect(updatedProject.currencies.varmann).toBe(updatedProject.currencies.varmann)
        expect(updatedProject.store.toString()).toBe(someStore._id.toString())

    })

    test('dont allow to update project with worng store', async () => {

        const project = await projectModel.findOne({})
        const wrongStoreId = new mongoose.Types.ObjectId().toString()

        await request(app.getHttpServer())
            .patch(`/project/${project._id}`)
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ store: wrongStoreId })
            .expect(400)
    })

})