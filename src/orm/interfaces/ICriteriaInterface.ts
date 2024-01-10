import { ObjectId, FindOptionsWhere } from 'typeorm';

export type ICriteria<T> = string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>;
