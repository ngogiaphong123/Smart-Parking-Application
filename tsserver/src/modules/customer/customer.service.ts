import prisma from "../../utils/prisma";
import { GetCustomersInput } from "./customer.schema";

export const getCustomersService = async (input: GetCustomersInput) => {
    const { page, limit } = input;
    const customers = await prisma.user.findMany({
        skip: page * limit,
        take: limit,
        where : {
            role : "customer"
        },
        select: {
            accountId: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatarUrl : true,
            vehicles : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                }
            }
        }
    })
    return customers;
}

export const getCustomerService = async (accountId : string) => {
    const customer = await prisma.user.findFirst({
        where : {
            accountId : accountId,
            role : "customer"
        },
        select: {
            accountId: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatarUrl : true,
            vehicles : {
                select : {
                    vehicleId : true,
                    genre : true,
                    model : true,
                    numberPlate : true,
                    rfidNumber : true,
                }
            }
        }
    })
    return customer;
}

export const getNewCustomerCountService = async ({start,end} : {start : Date, end : Date}) => {
    const customers = await prisma.user.findMany({
        where : {
            createdAt : {
                gte : start,
                lte : end
            },
            role : "customer"
        }
    });
    return customers.length;
}