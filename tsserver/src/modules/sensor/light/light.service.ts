import { io } from "../../..";
import log from "../../../utils/logger";
import prisma from "../../../utils/prisma";
import ResponseBody from "../../../utils/responseBody";
import Light from "./light.schema";
import axios from 'axios';

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
export const getLightService = async ({page,limit} : {
    page : string,
    limit : string
}) => {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const light = await prisma.lightSensor.findMany({
        skip : pageInt * limitInt,
        take : limitInt,
        orderBy : {
            timestamp : 'desc'
        }
    });
    return new ResponseBody("Success", "Get light", light);
}
  
export const saveLightService = async (light : Light) => {
    // check duplicate
    const checkDuplicate = await prisma.lightSensor.findFirst({
        where : {
            recordId : light._id
        }
    });
    if(checkDuplicate) {
        return checkDuplicate;
    }
    const newLight = await prisma.lightSensor.upsert({
        where : {
            recordId : light._id
        },
        create : {
            recordId : light._id,
            unit : light.unit,
            timestamp : light.timestamp,
            lux : light.lux
        },
        update : {
            timestamp : light.timestamp,
            unit : light.unit,
            lux : light.lux
        }
    })
    io.emit("light-channel", new ResponseBody("Success", "Save light", [newLight]));
    return newLight;
}

export const getLightFromAdafruitService = async (limit : number) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "cambienanhsang"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json',
            timeout : 2000
        },
        params : {
            limit : limit
        }
    };
    try {
        const {data} = await axios.get(url, config);
        return data;
    }
    catch(err : any) {
        log.error(err);
    }
}