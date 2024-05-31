import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { DataSourceOptions } from 'typeorm'

dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_USER_PWD, DB_NAME, NODE_ENV } =
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
  entities: [__dirname + '/entities/**/*.ts'],
  migrations: [__dirname + '/migrations/**/*.ts'],
  subscribers: [__dirname + '/subscribers/**/*.ts'],
}

// console.log('DB Configuration:', connectionOptions)

const AppDataSource = new DataSource(connectionOptions)

export default AppDataSource
