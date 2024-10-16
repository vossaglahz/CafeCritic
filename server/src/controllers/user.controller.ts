import { UserService } from "@/services/user.service";
import { RequestHandler } from "express";
import { plainToInstance } from 'class-transformer';
import { RegistrationUserDto } from "@/dto/registration-user.dto";
import { SignInUserDto } from "@/dto/sign-in-user.dto";
import { formatErrors } from "@/helpers/formatErrors";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  signIn: RequestHandler = async (req, res): Promise<void> => { 
    try {
      const signInDto = plainToInstance(SignInUserDto, req.body)
      const user = await this.service.signIn(signInDto)
      res.send(user)
    } catch (e) {
      res.status(401).send((e as Error).message)
    }
  }

  registration: RequestHandler = async (req, res): Promise<void> => {
    try {
      const registrationInDto = plainToInstance(RegistrationUserDto, req.body);
      if (req.file) registrationInDto.image = req.file.filename;
      const user = await this.service.registration(registrationInDto);
      res.send(user);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  }
  
  validateToken: RequestHandler = async (req, res): Promise<void> => {
    const token = req.headers.authorization
    const user = await this.service.validateToken(token)
    res.send(user)
  }

  logout: RequestHandler = async (req, res): Promise<void> => {
    try {
      const {id} = req.query
      await this.service.logout(parseInt(id as string))
      res.status(200).send(id)
    } catch (e) {
      res.status(500).send(e);
    }
  }
}
