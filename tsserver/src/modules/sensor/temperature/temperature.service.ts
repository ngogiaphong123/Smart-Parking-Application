import { io } from "../../..";
import log from "../../../utils/logger";
import prisma from "../../../utils/prisma";
import ResponseBody from "../../../utils/responseBody";
import Temperature from "./temperature.schema";
import axios from 'axios';

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
export const getTemperatureService = async ({page,limit} : {
    page : string,
    limit : string
}) => {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const temperature = await prisma.temperatureSensor.findMany({
        skip : pageInt * limitInt,
        take : limitInt,
        orderBy : {
            timestamp : 'desc'
        }
    });
    return new ResponseBody("Success", "Get temperature", temperature);
}
  
export const saveTemperatureService = async (temperature : Temperature) => {
    // check duplicate
    const checkDuplicate = await prisma.temperatureSensor.findFirst({
        where : {
            recordId : temperature._id
        }
    });
    if(checkDuplicate) {
        return checkDuplicate;
    }
    const newTemperature = await prisma.temperatureSensor.upsert({
        where : {
            recordId : temperature._id
        },
        create : {
            recordId : temperature._id,
            unit : temperature.unit,
            timestamp : temperature.timestamp,
            temperature : temperature.temperature
        },
        update : {
            timestamp : temperature.timestamp,
            unit : temperature.unit,
            temperature : temperature.temperature
        }
    })
    const res = new ResponseBody("Success", "Save temperature", [newTemperature]);
    io.emit("temperature-channel", res);
    return newTemperature;
}

export const getTemperatureFromAdafruitService = async (limit : number) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "cambiennhiet"
    const url = `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feedName}/data`;
    const config = {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json'
        },
        params : {
            limit : limit
        }
    };try {
        const {data} = await axios.get(url, config);
        return data;
    }
    catch (err) {
        log.info(err);
    }
}

export const updateTemperatureToAdafruitService = async (value : number) => {
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
    try {
        const {data} = await axios.post(url, {
            value : value
        }, config);
        return data;
    }
    catch (err) {
        log.info(err);
    }
}