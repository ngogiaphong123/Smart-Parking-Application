import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import { loginService, registerService } from "./user.service";
import { signJwt } from '../../utils/jwt.utils';
import responseBody from '../../utils/responseBody';

export const registerController = async (req: Request<{},{},RegisterUserInput>, res: Response) => {
    if(!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).send(new responseBody("Error", "Please upload your avatar", null));
    }
    else {
        if(req.body.role === 'admin'){
            if(!res.locals.user) {
                return res.status(StatusCodes.UNAUTHORIZED).send(new responseBody("Error", "Unauthorized", null));
            }
            if(res.locals.user.role !== 'admin'){
                return res.status(StatusCodes.FORBIDDEN).send(new responseBody("Error", "Forbidden", null));
            }
            const {path,filename} = req.file;
            const admin = await registerService(req.body,path,filename);
            if(!admin) {
                return res.status(StatusCodes.BAD_REQUEST).send(new responseBody("Error", "Admin already exists", null));
            }
            res.status(StatusCodes.CREATED).send(new responseBody("Success", "Admin created", admin));
        }
        else if(req.body.role === 'customer'){
            const {path,filename} = req.file;
            const customer = await registerService(req.body,path,filename);
            if(!customer) {
                return res.status(StatusCodes.BAD_REQUEST).send(new responseBody("Error", "Customer already exists", null));
            }
            res.status(StatusCodes.CREATED).send(new responseBody("Success", "Customer created", customer));
        }
        else {
            return res.status(StatusCodes.BAD_REQUEST).send(new responseBody("Error", "Invalid role", null));
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
        return res.status(StatusCodes.OK).send(new responseBody("Success", "Login success", {
            accessToken,
            refreshToken,
        }));
    }
}
export const getUserController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(new responseBody("Success", "Get user success", res.locals.user));
}
export const logoutController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(new responseBody("Success", "Logout success", {
        accessToken : null,
        refreshToken : null,
    }));
}
