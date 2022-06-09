import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDefined,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;

  @IsOptional()
  @IsBoolean()
  isVaccinated: boolean;
}
