import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import bcrypt from 'bcrypt';
import { UserRole } from "@/interfaces/IUser.interface";
import { Place } from "./place.entity";

const SALT_WORK_FACTOR = 10;
@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string

    @Column()
    password!: string

    @Column({nullable: true})
    token!: string

    @Column({nullable: true})
    displayName!: string

    @Column({nullable: true})
    email!: string

    @Column()
    image!: string

    @Column({default: UserRole.user})
    role!: string

    async comparePassword(password: string): Promise<boolean> { //при сайнин сверяет password, введенный пасворд у юзернейма
        return await bcrypt.compare(password, this.password); //даже в бд нет пассворда, там только шифрованный и его бкрипт расшифрует и проверит
    }

    async hashPassword() {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }

    generateToken() {
        this.token = crypto.randomUUID(); 
    }

    @OneToMany(() => Place, (place) => place.user)
    place!: Place[]

}