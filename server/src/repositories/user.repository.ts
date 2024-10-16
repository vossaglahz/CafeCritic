import { AppDataSource } from "@/appDataSource";
import { Repository } from "typeorm";
import { User } from "@/entities/user.entity";
import { IUser } from "@/interfaces/IUser.interface";
import { SignInUserDto } from "@/dto/sign-in-user.dto";
import { RegistrationUserDto } from "@/dto/registration-user.dto";
import bcrypt from 'bcrypt';
import _ from "lodash";

const SALT_WORK_FACTOR = 10;

export class UserRepo {
    private repo: Repository<User>

    constructor() {
        this.repo = AppDataSource.getRepository(User)
    }

    async signIn(signInUserDto: SignInUserDto): Promise<IUser> {
        const userData = await this.repo.findOne({where: {username: signInUserDto.username}})
        if(!userData) throw new Error('Invalid username or password')
        
        const isCorrect = await userData.comparePassword(signInUserDto.password)
        if(!isCorrect) throw new Error('Invalid username or password')
        
        userData.generateToken()
        const user = await this.repo.save(userData)

        const userWithoutPass = _.omit(user, 'password')
        return userWithoutPass
    }

    async registration(registrationUserDto: RegistrationUserDto): Promise<IUser> {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        registrationUserDto.password = await bcrypt.hash(registrationUserDto.password, salt)
        const user = await this.repo.save(registrationUserDto)
        const userWithoutPass = _.omit(user, 'password')
        return userWithoutPass
    }

    async validateToken(token?: string): Promise<IUser | null> {
        if(token) {
            const user = await this.repo.findOne({where: {token: token}})
            if(!user) return null
            const userWithoutPass = _.omit(user, 'password')
            return userWithoutPass
        } else {
            return null
        }
    }

    async logout(userId: number) {
        const user = await this.repo.findOne({where: {id: userId}})
        if(!user)  throw new Error('User not have')
        user.token = ''
        await this.repo.save(user)
    }
}

export const userRepo = new UserRepo()