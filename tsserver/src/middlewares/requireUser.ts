import { NextFunction, Request, Response } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    return next();
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    if(res.locals.user.role !== 'admin') {
        return res.status(403).send("Forbidden");
    }
    return next();
}

export const requireCustomer = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    if(res.locals.user.role !== 'customer') {
        return res.status(403).send("Forbidden");
    }
    return next();
}