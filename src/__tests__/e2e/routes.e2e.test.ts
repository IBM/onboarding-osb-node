import request from 'supertest'
import app from '../../app'
import AppDataSource from '../../db/data-source'

describe('Routes End-to-End Tests', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('should respond to a valid route', async () => {
    const response = await request(app).get('/valid-route')
    expect(response.status).toBe(200)
  })
})
