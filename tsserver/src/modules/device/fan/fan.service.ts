import { io } from "../../..";
import prisma from "../../../utils/prisma";
import axios from 'axios';
import Fan from "./fan.schema";

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
export const getFanService = async ({page,limit} : {
    page : string,
    limit : string
}) => {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const fan = await prisma.fanDevice.findMany({
        skip : pageInt * limitInt,
        take : limitInt,
        orderBy : {
            timestamp : 'desc'
        }
    });
    return fan;
}
  
export const saveFanService = async (fan : Fan) => {
    // check duplicate
    const checkDuplicate = await prisma.fanDevice.findFirst({
        where : {
            recordId : fan._id
        }
    });
    if(checkDuplicate) {
        return checkDuplicate;
    }
    const newFan = await prisma.fanDevice.create({
        data : {
            recordId : fan._id,
            timestamp : fan.timestamp,
            status : fan.status
        }
    })
    io.emit("fan-channel", newFan);
    return newFan;
}

export const getFanStatusFromAdafruitService = async (limit : number) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "nutquat"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
        },
        params : {
            limit : limit
        }
    };
    const {data} = await axios.get(url, config);
    return data;
}

export const updateFanStatusToAdafruitService = async (status : string) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "cambiennhiet"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
        }
    };
    const {data} = await axios.post(url, {
        value : status
    }, config);
    return data;
}