import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()

export const dataSourse = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT ?? ''),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  ssl: true,
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: false,
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
})
