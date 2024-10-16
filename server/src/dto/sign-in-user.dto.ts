import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
    @Expose() 
    @IsNotEmpty({message: 'Логин не должен быть пустым'})
    @IsString({message: 'Логин должен быть строкой'})
    username!: string;

    @Expose()
    @IsNotEmpty({message: 'Пароль не должен быть пустым'})
    @IsString({message: 'Пароль должен быть строкой'})
    password!: string;
}
