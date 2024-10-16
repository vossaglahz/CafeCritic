import { SignInUserDto } from "@/dto/sign-in-user.dto"
import { RegistrationUserDto } from "@/dto/registration-user.dto"
import { userRepo } from "@/repositories/user.repository"

export class UserService {
    async signIn(signInUserDto: SignInUserDto) {
        return await userRepo.signIn(signInUserDto)
    }

    async registration(registrationUserDto: RegistrationUserDto) {
        return await userRepo.registration(registrationUserDto)
    }

    async validateToken(token?: string) {
        return await userRepo.validateToken(token)
    }

    async logout(userId: number) {
        return await userRepo.logout(userId)
    }
}
