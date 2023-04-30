import { io } from "../../..";
import prisma from "../../../utils/prisma";
import axios from 'axios';
import Fan from "./fan.schema";
import ResponseBody from "../../../utils/responseBody";
import log from "../../../utils/logger";

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
    return new ResponseBody("Success", "Get fan status", fan);
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
    const newFan = await prisma.fanDevice.upsert({
        where : {
            recordId : fan._id
        },
        create : {
            recordId : fan._id,
            timestamp : fan.timestamp,
            status : fan.status
        },
        update : {
            timestamp : fan.timestamp,
            status : fan.status
        }
    })
    return newFan;
}

export const getFanStatusFromAdafruitService = async (limit : number) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "fan"
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
    try {
        const {data} = await axios.get(url, config);
        return data;
    }
    catch(err) {
        log.error(err)
    }
}

export const updateFanStatusToAdafruitService = async (status : string) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "fan"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
        }
    };
    try {
        const {data} = await axios.post(url, {
            value : status
        }, config);
        const result = await saveFanService(new Fan(data.id, new Date(data.created_at), data.value));
        return new ResponseBody("Success", "Update fan status to adafruit success", [result]);
    }
    catch(err) {
        log.info(err)
    }
}