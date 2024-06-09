import dotenv from 'dotenv'

dotenv.config({ path: './tests/.env.test' })

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Application specific logging, throwing an error, or other logic here
  throw reason // rethrow to fail the test
})
