import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_USER_PWD, DB_NAME, NODE_ENV } =
  process.env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT || '5432'),
  username: DB_USER,
  password: DB_USER_PWD,
  database: DB_NAME,
  synchronize: NODE_ENV === 'development' ? false : false,
  logging: NODE_ENV === 'development' ? false : false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
})
