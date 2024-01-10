import { DataSource } from 'typeorm';

const { PG_HOST, PG_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'localhost',
  port:  5433,
  username: 'user',
  password: 'password',
  database: 'wizzerapp',
  migrations: ['src/orm/migrations/**/*.ts'],
})

