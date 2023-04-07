import Fan from "../modules/device/fan/fan.schema";
import { getFanStatusFromAdafruitService, saveFanService } from "../modules/device/fan/fan.service";
import Light from "../modules/sensor/light/light.schema";
import { getLightFromAdafruitService, saveLightService } from "../modules/sensor/light/light.service";
import Temperature from "../modules/sensor/temperature/temperature.schema";
import { getTemperatureFromAdafruitService, saveTemperatureService } from "../modules/sensor/temperature/temperature.service";

export const temperatureCalling = () => {
    setInterval(async () => {
        const limit = 1;
        const data = await getTemperatureFromAdafruitService(limit);
        data.forEach(async (element : any) => {
            // to change timezone to GMT+7
            const temp = new Temperature(element.id, "C", element.created_at, element.value)
            await saveTemperatureService(temp);
        });
    },2000);
}

export const lightCalling = () => {
    setInterval(async () => {
        const limit = 1;
        const data = await getLightFromAdafruitService(limit);
        data.forEach(async (element : any) => {
            // to change timezone to GMT+7
            const temp = new Light(element.id, "C", element.created_at, element.value)
            await saveLightService(temp);
        });
    },2000);
}

export const fanCalling = () => {
    setInterval(async () => {
        const limit = 1;
        const data = await getFanStatusFromAdafruitService(limit);
        data.forEach(async (element : any) => {
            const temp = new Fan(element.id, element.created_at, element.value)
            await saveFanService(temp);
        });
    },2000);
}