import Fan from "../modules/device/fan/fan.schema";
import { getFanStatusFromAdafruitService, saveFanService } from "../modules/device/fan/fan.service";
import { getRfidFromAdafruitService, verifyRfid } from "../modules/rfid/rfid.service";
import Light from "../modules/sensor/light/light.schema";
import { getLightFromAdafruitService, saveLightService } from "../modules/sensor/light/light.service";
import Temperature from "../modules/sensor/temperature/temperature.schema";
import { getTemperatureFromAdafruitService, saveTemperatureService } from "../modules/sensor/temperature/temperature.service";
import log from "./logger";

export const temperatureCalling = async () => {
    log.info("Calling temperature");
    const limit = 1;
    const data = await getTemperatureFromAdafruitService(limit);
    if (data) {
        data.forEach(async (element: any) => {
            // to change timezone to GMT+7
            const temp = new Temperature(element.id, "C", element.created_at, element.value)
            await saveTemperatureService(temp);
        });
    }
    else {
        log.error("Error calling temperature");
    }
    setTimeout(() => {
        temperatureCalling();
    }, 1000);
}

export const lightCalling = async () => {
    log.info("Calling light");
    const limit = 1;
    const data = await getLightFromAdafruitService(limit);
    if (data) {
        data.forEach(async (element: any) => {
            // to change timezone to GMT+7
            const light = new Light(element.id, "lux" ,element.created_at, element.value)
            await saveLightService(light);
        });
    }
    else {
        log.error("Error calling light");
    }
    setTimeout(() => {
        lightCalling();
    }, 1000);
}

export const rfidCalling = async (prevData : Array<any>, first = true) => {
    const limit = 1;
    const data = await getRfidFromAdafruitService(limit);
    if(first) {
        prevData.push(data[0]);
        log.info("First time")
    }
    else {
        if (data) {
            const check = prevData.find((element) => element.id === data[0].id)
            if (!check) {
                prevData.push(data[0]);
                log.info(`Begin verify RFID tag : ${data[0].value}`)
                const result = await verifyRfid(data[0].value);
                log.info(`End verify RFID tag : ${data[0].value}`)
            }
            else {
                log.info("No new RFID tag")
            }
        }
        else {
            log.error("Error");
        }
    }
    setTimeout(()=>{
        rfidCalling(prevData, false);
    }, 1000);
}