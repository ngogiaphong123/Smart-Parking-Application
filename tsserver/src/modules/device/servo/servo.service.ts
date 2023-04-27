import prisma from "../../../utils/prisma";
import axios from 'axios';
import Servo from "./servo.schema";
import log from "../../../utils/logger";

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
export const getServoService = async ({page,limit} : {
    page : string,
    limit : string
}) => {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const servo = await prisma.servoDevice.findMany({
        skip : pageInt * limitInt,
        take : limitInt,
        orderBy : {
            timestamp : 'desc'
        }
    });
    return servo;
}
  
export const saveServoService = async (Servo : Servo) => {
    // check duplicate
    const checkDuplicate = await prisma.servoDevice.findFirst({
        where : {
            recordId : Servo._id
        }
    });
    if(checkDuplicate) {
        return checkDuplicate;
    }
    const newServo = await prisma.servoDevice.upsert({
        where : {
            recordId : Servo._id
        },
        create : {
            recordId : Servo._id,
            timestamp : Servo.timestamp,
            status : Servo.status
        },
        update : {
            timestamp : Servo.timestamp,
            status : Servo.status
        }
    })
    return newServo;
}

export const getServoStatusFromAdafruitService = async (limit : number) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "Servo"
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
        log.info(err);
    }
}

export const updateServoStatusToAdafruitService = async (status : string) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "servo"
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
        const result = await saveServoService(new Servo(data.id, new Date(data.created_at), data.value));
        return result;
    }
    catch(err) {
        log.info(err);
    }
}

export const updatePriceToAdafruitService = async (status : string) => {
    const AIO_USERNAME = process.env.ADAFRUIT_IO_USERNAME || '';
    const AIO_KEY = process.env.ADAFRUIT_IO_KEY || '';
    const feedName = "giatien"
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
    }
    catch(err) {
        log.info(err);
        return null;
    }
}