import prisma from "../../utils/prisma";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import * as argon2 from 'argon2';
export const registerService = async (input : RegisterUserInput, path : string, filename : string) => {
    const { email, password, firstName,lastName, role, phone} = input;
    // Check if user already exists
    const foundUser = await prisma.user.findUnique({
        where : {
            email,
        }
    });
    if(foundUser) {
        return null;
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password: hashedPassword,
            role,
            avatarUrl : path,
            avatarFileName : filename,
            phone
        },
        select : {
            accountId : true,
            email : true,
            firstName : true,
            lastName : true,
        }
    });
    return newUser;
};

export const loginService = async (input : LoginUserInput) => {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select : {
            accountId : true,
            firstName : true,
            lastName : true,
            email : true,
            password : true,
            role : true,
            avatarUrl : true,
        }
    });
    if(user && await argon2.verify(user.password, password)){
        const { password, ...rest } = user;
        return rest;
    }
    return null;
}
