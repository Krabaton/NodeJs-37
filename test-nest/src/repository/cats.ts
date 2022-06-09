import { Cat } from '../entity/Cat';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {}
