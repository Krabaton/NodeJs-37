import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatRepository } from '../repository/cats';

@Module({
  imports: [TypeOrmModule.forFeature([CatRepository])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
