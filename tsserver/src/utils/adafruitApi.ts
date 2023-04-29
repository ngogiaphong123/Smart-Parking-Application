import Fan from "../modules/device/fan/fan.schema";
import { getFanStatusFromAdafruitService, saveFanService } from "../modules/device/fan/fan.service";
import { getRfidFromAdafruitService, verifyRfid } from "../modules/rfid/rfid.service";
import Light from "../modules/sensor/light/light.schema";
import { getLightFromAdafruitService, saveLightService } from "../modules/sensor/light/light.service";
import Temperature from "../modules/sensor/temperature/temperature.schema";
import { getTemperatureFromAdafruitService, saveTemperatureService } from "../modules/sensor/temperature/temperature.service";

export const temperatureCalling = () => {
    setInterval(async () => {
        const limit = 1;
        const data = await getTemperatureFromAdafruitService(limit);
        if(data) {
            data.forEach(async (element : any) => {
                const temp = new Temperature(element.id, "C", element.created_at, element.value)
                await saveTemperatureService(temp);
            });
        }
        else {
            console.log("Error");
        }
    },10000);
}

export const lightCalling = () => {
    setInterval(async () => {
        const limit = 1;
        const data = await getLightFromAdafruitService(limit);
        if(data) {
            data.forEach(async (element : any) => {
                // to change timezone to GMT+7
                const temp = new Light(element.id, "lux", element.created_at, element.value)
                await saveLightService(temp);
            });
        }
        else {
            console.log("Error");
        }
    },10000);
}

export const fanCalling = () => {
    setInterval(async () => {
        const limit = 1;
        const data = await getFanStatusFromAdafruitService(limit);
        data.forEach(async (element : any) => {
            const temp = new Fan(element.id, element.created_at, element.value)
            await saveFanService(temp);
        });
    },1000);
}

export const rfidCalling = () => {
    const prevData : any = [];
    let first = true;
    setInterval(async () => {
        const limit = 1;
        const data = await getRfidFromAdafruitService(limit);
        if (first) {
            prevData.push(data[0]);
            first = false;
        }
        if(data) {
            // check if data id is in prevData
            const check = prevData.find((element : any) => element.id === data[0].id);
            if(!check) {
                prevData.push(data[0]);
                console.log("RFID: ", data[0].value);
                const result = await verifyRfid(data[0].value);
            }
        }
        else {
            console.log("Error");
        }
    },4000);
}