import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import { getUserService, loginService, registerService } from "./user.service";
import { signJwt } from '../../utils/jwt.utils';
import ResponseBody from '../../utils/responseBody';

export const registerController = async (req: Request<{},{},RegisterUserInput>, res: Response) => {
    if(!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).send(new ResponseBody("Error", "Please upload your avatar", null));
    }
    else {
        if(req.body.role === 'admin'){
            if(!res.locals.user) {
                return res.status(StatusCodes.UNAUTHORIZED).send(new ResponseBody("Error", "Unauthorized", null));
            }
            if(res.locals.user.role !== 'admin'){
                return res.status(StatusCodes.FORBIDDEN).send(new ResponseBody("Error", "Forbidden", null));
            }
            const {path,filename} = req.file;
            const admin = await registerService(req.body,path,filename);
            if(!admin) {
                return res.status(StatusCodes.BAD_REQUEST).send(new ResponseBody("Error", "Admin already exists", null));
            }
            res.status(StatusCodes.CREATED).send(new ResponseBody("Success", "Admin created", admin));
        }
        else if(req.body.role === 'customer'){
            const {path,filename} = req.file;
            const customer = await registerService(req.body,path,filename);
            if(!customer) {
                return res.status(StatusCodes.BAD_REQUEST).send(new ResponseBody("Error", "Customer already exists", null));
            }
            res.status(StatusCodes.CREATED).send(new ResponseBody("Success", "Customer created", customer));
        }
        else {
            return res.status(StatusCodes.BAD_REQUEST).send(new ResponseBody("Error", "Invalid role", null));
        }
    }
}
export const loginController = async (req: Request<{},{},LoginUserInput>, res: Response) => {
    const user = await loginService(req.body);
    if(!user) {
        res.status(StatusCodes.UNAUTHORIZED).send(new ResponseBody("Error","Invalid email or password", null));
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
        return res.status(StatusCodes.OK).send(new ResponseBody("Success", "Login success", {
            accessToken,
            refreshToken,
        }));
    }
}
export const getUserController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get user success", res.locals.user));
}
export const getUserInfoController = async (req: Request, res: Response) => {
    const accountId = res.locals.user.accountId;
    const result = await getUserService(accountId);
    if(!result) {
        return res.status(StatusCodes.NOT_FOUND).send(new ResponseBody("Error", "User not found", null));
    }
    return res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get user info success", result));
}
export const logoutController = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).send(new ResponseBody("Success", "Logout success", {
        accessToken : null,
        refreshToken : null,
    }));
}
