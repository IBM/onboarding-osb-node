import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { DataSourceOptions } from 'typeorm'
import path from 'path'
import Logger from '../utils/logger'

dotenv.config()

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
  entities: [path.join(process.cwd(), '/src/db/entities/**/*.ts')],
  migrations: [path.join(process.cwd(), '/src/db/migrations/**/*.ts')],
  subscribers: [path.join(process.cwd(), '/src/db/subscribers/**/*.ts')],
  ssl: DB_CERT
    ? {
        rejectUnauthorized: false,
        ca: DB_CERT,
      }
    : undefined,
}

Logger.info('DB Configuration:', connectionOptions)
const path1 = path.join(__dirname, 'entities/**/*.ts')
Logger.info('__dirname::::', path1)

const path2 = path.join(process.cwd(), '/src/db/entities/**/*.ts')
Logger.info('process.cwd()::::', path2)
const AppDataSource = new DataSource(connectionOptions)

export default AppDataSource
