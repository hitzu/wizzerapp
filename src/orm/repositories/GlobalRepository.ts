import { EntityTarget, FindOneOptions, UpdateResult, FindManyOptions, DeepPartial, DeleteResult, SelectQueryBuilder, InsertQueryBuilder, UpdateQueryBuilder, DeleteQueryBuilder, RelationQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DBConnection } from '../config/connection';
import { ICriteria } from '../interfaces/ICriteriaInterface';


export default class GlobalRepository<Entity> {
  public entity: EntityTarget<Entity>;

  // crud functions --

  public async create(data: DeepPartial<Entity>): Promise<DeepPartial<Entity> & Entity> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.save(data);
  }

  public async find(findOptions?: FindManyOptions<Entity>): Promise<Entity[]> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.find(findOptions);
  }

  public async findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.findOne(options);
  }

  public async findOneOrFail(options?: FindOneOptions<Entity>): Promise<Entity | undefined> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.findOneOrFail(options);
  }

  public async update(criteria: ICriteria<Entity>, data: QueryDeepPartialEntity<Entity>): Promise<UpdateResult> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.update(criteria, data);
  }

  public async delete(criteria: ICriteria<Entity>): Promise<DeleteResult> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.delete(criteria);
  }

  public async softDelete(criteria: ICriteria<Entity>): Promise<UpdateResult> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.softDelete(criteria);
  }

  // Bulk functions -----------------------------------------

  public async bulk(data: DeepPartial<Entity>[]): Promise<Entity[]> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.save(data, { chunk: 500 });
  }

  public async bulkUpdate(pk: keyof Entity, records: QueryDeepPartialEntity<Entity>[]): Promise<number> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    let rowsAffected = 0;

    for (const request of records) {
      const pk_value = request[pk] as any;
      rowsAffected += (await conn.update(pk_value, request)).affected;
    }
  
    return rowsAffected;
  }

  // query builders

  public async queryBuilder(): Promise<SelectQueryBuilder<Entity> | InsertQueryBuilder<Entity> | UpdateQueryBuilder<Entity> | DeleteQueryBuilder<Entity> | RelationQueryBuilder<Entity>> {
    const conn = await new DBConnection().getDataRepository(this.entity);
    return conn.createQueryBuilder()
  }
  

}
