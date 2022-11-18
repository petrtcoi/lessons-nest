import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { DefaultCurrency } from '../src/entities/currency/enums/defaultCurrency.enum';


describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ (GET)', async () => {
        const result = await request(app.getHttpServer())
            .get(`/currency/${DefaultCurrency.EURO}`)
            .expect(200)

        expect(result.body.name).toBe(DefaultCurrency.EURO)
        expect(typeof (result.body.rate)).toBe('number')
    })
})
