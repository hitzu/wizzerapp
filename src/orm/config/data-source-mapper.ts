import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './data-source';

export class DataSourceManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: DataSourceManager;
  private dataSources: Map<string, DataSource> = new Map();

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }
    return DataSourceManager.instance;
  }

  public async createDataSource(
    name: string,
    options?: DataSourceOptions
  ): Promise<DataSource> {
    const _options = options || dataSourceOptions.get(name);
    console.log('createDataSource', name, _options)
    return this.dataSources
      .set(name, await new DataSource(_options).initialize())
      .get(name);
  }

  public getDataSource(dataSourceName?: string): Promise<DataSource> {
    console.log('estoy entrando aqui jejejeje');
    const isCreated = this.dataSources.get(dataSourceName || 'default');
    console.log('is created', isCreated)
    if (!isCreated) {
      console.log('voy a crear el datasource');
      return this.createDataSource(dataSourceName || 'default');
    }
    return isCreated as unknown as Promise<DataSource>;
  }

  private map() {
    return Array.from(this.dataSources.values());
  }

  public getActiveDataSources() {
    return this.map().filter((ds: DataSource) => ds.isInitialized);
  }

  public debug() {
    console.log(
      'DataSourceManager.debug',
      this.getActiveDataSources().map((ds: DataSource) => {
        return {
          isInitialized: ds.isInitialized,
          type: ds.options.type,
          dbName: ds.options.database
        };
      })
    );
  }

  public destroyDataSources() {
    const dataSources = Promise.all(
      Array.from(this.dataSources.values()).map(dataStore => dataStore.destroy())
    )
      .then(data => {
        console.log(`Destroyed (${data.length}) data source`);
      })
      .catch(errors => {
        console.log('Error: Destroying DataSources:', errors);
      });
    return dataSources;
  }
}
