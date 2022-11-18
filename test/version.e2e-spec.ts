import { INestApplication, Logger } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import mongoose, { Model } from 'mongoose'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'
import { Version, VersionDocument } from '../src/entities/version/schemas/version.schema'
import { getModelToken } from '@nestjs/mongoose'
import { Project, ProjectDocument } from '../src/entities/project/schemas/project.schema'
import { RoomDocument, Room } from '../src/entities/room/schemas/room.schema'


import oauthToken from './fixtures/oauthTokean'
import { UpdateVersionDto } from '../src/entities/version/dto/updateVersion.dto'



describe('Version', () => {
    let app: INestApplication
    let versionModel: Model<VersionDocument>
    let projectModel: Model<ProjectDocument>
    let roomModel: Model<RoomDocument>

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()
        app = moduleFixture.createNestApplication()
        await app.init()
        app.useLogger(new Logger())

        versionModel = moduleFixture.get<Model<VersionDocument>>(getModelToken(Version.name))
        projectModel = moduleFixture.get<Model<ProjectDocument>>(getModelToken(Project.name))
        roomModel = moduleFixture.get<Model<RoomDocument>>(getModelToken(Room.name))


        await versionModel.deleteMany({})
    })

    afterAll(async () => {
        await app.close()
    })

    test('create version with custom title', async () => {

        const someProject = await projectModel.findOne({})
        const SAMPLE_TITLE = 'some title'

        const response = await request(app.getHttpServer())
            .post('/version')
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ projectId: someProject.id, title: SAMPLE_TITLE })
            .expect(200)

        const version = await versionModel.findOne({ _id: response.body.id })
        expect(version.title).toBe(SAMPLE_TITLE)
    })

    test('create version with zero room', async () => {

        const someProject = await projectModel.findOne({})
        const response = await request(app.getHttpServer())
            .post('/version')
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ projectId: someProject.id })
            .expect(200)

        const rooms = await roomModel.find({ version: response.body.id.toString() }).lean()
        expect(rooms.length).toBe(1)
        expect(rooms[0].type).toBe('zero')

    })

    test('version update works', async () => {

        const version = await versionModel.findOne({})
        const updates: UpdateVersionDto = {
            title: version.title + 'some_changes',
            description: version.description + 'change',
            images: version.images + '/n new imagae'
        }
        await request(app.getHttpServer())
            .patch(`/version/${version._id}`)
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send(updates)
            .expect(200)

        const updatedVersion = await versionModel.findOne({ _id: version._id })
        expect(updatedVersion.title).toBe(updates.title)
        expect(updatedVersion.description).toBe(updates.description)
        expect(updatedVersion.images).toBe(updates.images)

    })




    test('dont create version with worng projectId', async () => {

        const someId = new mongoose.Types.ObjectId().toString()
        await request(app.getHttpServer())
            .post('/version')
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send({ projectId: someId })
            .expect(400)
    })


    test('delete version with all rooms', async () => {

        const version = await versionModel.findOne({})
        const rooms = await roomModel.find({version: version._id})
        expect(rooms.length).not.toBe(0)

        await request(app.getHttpServer())
            .delete(`/version/${version._id}`)
            .set('Accept', 'application/json')
            .set({ 'Authorization': `OAuth ${oauthToken}` })
            .send()
            .expect(200)

        const checkVersion = await versionModel.findOne({_id: version.id})
        expect(checkVersion).toBe(null)

        const checkRoom = await roomModel.findOne({version: version._id})
        expect(checkRoom).toBe(null)
    })
})