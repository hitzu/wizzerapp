import { DataSourceOptions } from 'typeorm';

const { PG_HOST, PG_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const dataSourceOptions: Map<string, DataSourceOptions> = new Map([
  [
    'migrations',
    {
      type: 'postgres',
      host: PG_HOST,
      port: Number(PG_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: 'postgres',
      synchronize: false,
      logging: true
    }
  ],
  [
    'default',
    {
      type: 'postgres',
      host: PG_HOST,
      port: Number(PG_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      entities: ['src/orm/entities/**/*.ts'],
      migrations: ['src/orm/migrations/**/*.ts'],
      synchronize: false,
      logging: true,
      relationLoadStrategy: 'query',
      extra: {
        statement_timeout: 29000
      },
      cli: {
        entitiesDir: 'src/orm/entities',
        migrationsDir: 'src/orm/migrations',
        subscribersDir: 'src/orm/subscriber'
      },
    }
  ]
]);
