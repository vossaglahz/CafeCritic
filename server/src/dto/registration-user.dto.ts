import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class RegistrationUserDto {
    @Expose() 
    @IsNotEmpty({message: 'Логин не должен быть пустым'})
    @IsString({message: 'Логин должен быть строкой'})
    username!: string;

    @Expose()
    @IsNotEmpty({message: 'Пароль не должен быть пустым'})
    @IsString({message: 'Пароль должен быть строкой'})
    password!: string;

    @Expose()
    @IsOptional()
    displayName?: string

    @Expose()
    @IsOptional()
    email?: string

    @Expose()
    @IsOptional()
    image?: string
}
