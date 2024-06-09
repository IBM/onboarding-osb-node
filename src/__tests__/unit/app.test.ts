import request from 'supertest'
import { app } from '../../app'

describe('App', () => {
  it('should respond with 200 for liveness check', async () => {
    const response = await request(app).get('/liveness')
    expect(response.status).toBe(200)
  })
})
