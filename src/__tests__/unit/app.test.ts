import request from 'supertest'
import { app } from '../../app'
import dotenv from 'dotenv'

dotenv.config()

describe('App', () => {
  it('should respond with 200 for liveness check', async () => {
    const username = process.env.BROKER_USERNAME
    const password = process.env.BROKER_PASSWORD
    const base64Credentials = Buffer.from(`${username}:${password}`).toString(
      'base64',
    )

    const response = await request(app)
      .get('/liveness')
      .set('Authorization', `Basic ${base64Credentials}`)

    expect(response.status).toBe(200)
  })
})
