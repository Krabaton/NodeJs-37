import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cat } from '../entity/Cat';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './data/db.sqlite',
  logging: true,
  synchronize: false,
  entities: [Cat],
};
