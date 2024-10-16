import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class ReviewDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Review не может быть создан без названия!' })
  @IsString({ message: 'Название должно быть строкой' })
  @Expose()
  text?: string;

  @IsOptional()
  @Expose() 
  datetime?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Review не может быть создан без рейтинга!' })
  @Expose()
  ratingFood?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Review не может быть создан без рейтинга!' })
  @Expose()
  ratingQuality?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Review не может быть создан без рейтинга!' })
  @Expose()
  ratingInterior?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Не указан place отзыва' })
  @IsNumberString({}, { message: 'Укажите корректный place' })
  @Expose() 
  placeId?: string;
}
