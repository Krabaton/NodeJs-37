import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';
import { CatRepository } from '../repository/cats';
import { Cat } from '../entity/Cat';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatRepository) private catRepository: CatRepository,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const { name, age } = createCatDto;
    const result = await this.catRepository.save({ name, age });
    return result;
  }

  async findAll() {
    return this.catRepository.find();
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOne({ id });
    if (!cat) {
      throw new HttpException(
        { message: 'Cat not found', status: HttpStatus.NOT_FOUND },
        404,
      );
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    await getConnection()
      .createQueryBuilder()
      .update(Cat)
      .set({ ...updateCatDto })
      .where('id = :id', { id })
      .execute();

    return this.findOne(id);
  }

  async remove(id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Cat)
      .where('id = :id', { id })
      .execute();

    return { message: `This action removes a #${id} cat` };
  }
}
