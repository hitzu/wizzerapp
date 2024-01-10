import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { DataSourceManager } from './data-source-mapper';

export class DBConnection {
  // to be used instead of getRepository()

  async getDataRepository<Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    dataSourceName?: string
  ): Promise<Repository<Entity>> {
    console.log('estoy empezando el repositorio', dataSourceName);
    const dataSource = await this.getDataSource(dataSourceName);
    return dataSource.getRepository(entityClass);
  }

  // to be used instead of getConnection()
  getDataSource(dataSourceName?: string): Promise<DataSource> {
    return DataSourceManager.getInstance().getDataSource(dataSourceName);
  }

  /**
   * create database if not exists
   */
  public async createDatabase(): Promise<void> {
    const { POSTGRES_DB } = process.env;
    const conn = await this.getDataSource('migrations');
    const result = await conn.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [POSTGRES_DB]
    );
    // eslint-disable-next-line no-negated-condition
    if (!result.length) {
      await conn.query(`CREATE DATABASE ${POSTGRES_DB}`);
      console.log('DBConnection.createDatabase() -- DB Created');
    } else console.log('DBConnection.createDatabase() -- DB already created');
  }

  /**
   * create database and run migrations
   */
  public async runMigrations(): Promise<void> {
    await this.createDatabase();
    console.log('DBConnection.runMigrations() -- Running Migrations');
    const conn = await this.getDataSource();
    await conn.runMigrations({ transaction: 'all' });
  }

  /**
   * undo migrations
   */
  public async undoMigrations(): Promise<void> {
    console.log('DBConnection.undoMigrations() -- Running Undo Migrations');
    const conn = await this.getDataSource();
    await conn.undoLastMigration();
  }
}

