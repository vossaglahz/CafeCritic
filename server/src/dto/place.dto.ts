import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PlaceDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Заведение не может быть создан без названия!' })
  @IsString({ message: 'Название должно быть строкой' })
  @Expose()
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Заведение не может быть создан без mainImage!' })
  @IsString({ message: 'mainImage должно быть строкой' })
  @Expose()
  mainImage?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Заведение не может быть создан без description!' })
  @IsString({ message: 'description должно быть строкой' })
  @Expose()
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'Published должно быть логическим значением' })
  @Expose()
  published?: boolean;

  @IsOptional()
  @IsNotEmpty({ message: 'Не указан пользователь' })
  @IsNumberString({}, { message: 'Укажите корректного пользователя' })
  @Expose() 
  userId?: string;
}