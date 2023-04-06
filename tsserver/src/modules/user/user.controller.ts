import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import { loginService, registerService } from "./user.service";
import { signJwt } from '../../utils/jwt.utils';

export const registerController = async (req: Request<{},{},RegisterUserInput>, res: Response) => {
    if(!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).send("Image is required");
    }
    else {
        if(req.body.role === 'admin'){
            if(!res.locals.user) {
                return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
            }
            if(res.locals.user.role !== 'admin'){
                return res.status(StatusCodes.FORBIDDEN).send("Forbidden");
            }
            const {path,filename} = req.file;
            const admin = await registerService(req.body,path,filename);
            if(!admin) {
                return res.status(StatusCodes.BAD_REQUEST).send("Admin already exists");
            }
            res.status(StatusCodes.CREATED).send(admin);
        }
        else if(req.body.role === 'customer'){
            const {path,filename} = req.file;
            const customer = await registerService(req.body,path,filename);
            if(!customer) {
                return res.status(StatusCodes.BAD_REQUEST).send("Customer already exists");
            }
            res.status(StatusCodes.CREATED).send(customer);
        }
        else {
            return res.status(StatusCodes.BAD_REQUEST).send("Invalid role");
        }
    }
}
export const loginController = async (req: Request<{},{},LoginUserInput>, res: Response) => {
    const user = await loginService(req.body);
    if(!user) {
        res.status(StatusCodes.UNAUTHORIZED).send("Invalid email or password");
    }
    else {
        const accessToken = signJwt(
            {...user},
            {expiresIn : process.env.ACCESS_TOKEN_TTL || '15m'}
        );
        const refreshToken = signJwt(
            {...user},
            {expiresIn : process.env.REFRESH_TOKEN_TTL || '7d'}
        );
        return res.status(StatusCodes.OK).send({
            accessToken,
            refreshToken,
        });
    }
}
export const getUserController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(res.locals.user);
}
export const logoutController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send({
        accessToken : null,
        refreshToken : null,
    });
}
