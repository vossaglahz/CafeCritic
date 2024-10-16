import { RequestHandler } from "express";
import { UserService } from "@/services/user.service";
import { RequestWithUser } from "@/interfaces/IRequest.interface";

const userService = new UserService();

export const authValidate: RequestHandler = async(req: RequestWithUser, res, next): Promise<any> => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(401).send({message: "Invalid Token"})

        const user = await userService.validateToken(token)
        if(!user) return res.status(401).send({message: "User Not Found"})

        req.user = user
        next()
    } catch (e) {
        return res.status(500).send({message: "Internal error"})
    }
};