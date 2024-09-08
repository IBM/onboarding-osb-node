import path from 'node:path'
import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'

const { DB_CERT, DB_HOST, DB_PORT, DB_USER, DB_USER_PWD, DB_NAME, NODE_ENV } =
  process.env

const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT || '5432', 10),
  username: DB_USER,
  password: DB_USER_PWD,
  database: DB_NAME,
  synchronize: NODE_ENV === 'development',
  logging: NODE_ENV === 'development',
  entities: [path.join(__dirname, 'entities/**/*.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations/**/*.{ts,js}')],
  subscribers: [path.join(__dirname, 'subscribers/**/*.{ts,js}')],
  ssl: DB_CERT
    ? {
        rejectUnauthorized: false,
        ca: DB_CERT,
      }
    : undefined,
}

const AppDataSource = new DataSource(connectionOptions)

export default AppDataSource
