import { DataSource } from 'typeorm'

const dataSourse = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT ?? ''),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [`${__dirname}/entity/*.ts`],
  logging: process.env.TYPEORM_LOGGING === 'true',
})

export default dataSourse
