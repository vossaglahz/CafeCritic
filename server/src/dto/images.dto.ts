import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ImagesDto {
  @IsOptional()
  @IsNotEmpty({ message: 'images не может быть создан без названия!' })
  @IsString({ message: 'Название должно быть строкой' })
  @Expose()
  imageName?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Не указан place images' })
  @IsNumberString({}, { message: 'Укажите корректный place' })
  @Expose() 
  placeId?: string;
}
