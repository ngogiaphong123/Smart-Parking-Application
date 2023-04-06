import { io } from "../../..";
import prisma from "../../../utils/prisma";
import Temperature from "./temperature.schema";
import axios from 'axios';
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
export const getTemperatureService = async ({page,limit} : {
    page : number,
    limit : number
}) => {
    console.log(page, limit)
    const temperature = await prisma.temperatureSensor.findMany({
        skip : (page - 1) * limit,
        take : limit,
        orderBy : {
            createdAt : 'desc'
        }
    });
    return temperature;
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
    const newTemperature = await prisma.temperatureSensor.create({
        data : {
            recordId : temperature._id,
            unit : temperature.unit,
            timestamp : temperature.timestamp,
            temperature : temperature.temperature
        }
    })
    io.emit("temperatureData", newTemperature);
    return newTemperature;
}

export const getTemperatureFromAdafruitService = async () => {
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
            limit : 1
        }
    };
    const {data} = await axios.get(url, config);
    return data[0];
}
