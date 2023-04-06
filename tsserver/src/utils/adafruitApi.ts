import Temperature from "../modules/sensor/temperature/temperature.schema";
import { getTemperatureFromAdafruitService, saveTemperatureService } from "../modules/sensor/temperature/temperature.service";
import moment from "moment-timezone";
export const temperatureCalling = () => {
    setInterval(async () => {
        const data = await getTemperatureFromAdafruitService();
        data.created_at = moment(data.created_at).tz("Asia/Ho_Chi_Minh").format();
        const temp = new Temperature(data.id, "C", data.created_at, data.value)
        await saveTemperatureService(temp);
    },2000);
}