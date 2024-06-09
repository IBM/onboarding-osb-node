import request from 'supertest'
import app from '../../app'
import AppDataSource from '../../db/data-source'

describe('App End-to-End Tests', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  it('should respond to liveness check', async () => {
    const response = await request(app).get('/liveness')
    expect(response.status).toBe(200)
  })

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route')
    expect(response.status).toBe(404)
  })
})
