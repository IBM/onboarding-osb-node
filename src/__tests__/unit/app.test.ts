import request from 'supertest'
import 'jest'
import 'class-transformer'
import 'class-validator'
import 'typeorm'
import { app, serverHandle } from '../../app'

jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm')
  return {
    ...actual,
    DataSource: class Mock {
      initialize = jest.fn()
      getRepository = jest.fn()
    },
  }
})

describe('App', () => {
  it('should respond with 200 for liveness check', async () => {
    await request(app).get('/liveness').expect(200)
  })
  afterAll(async () => {
    ;(await serverHandle).close()
  })
})
