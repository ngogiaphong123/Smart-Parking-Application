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