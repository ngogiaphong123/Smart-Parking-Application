import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ExpressError from './utils/expressError';
import { StatusCodes } from 'http-status-codes';
import log from './utils/logger';
import deserializeUser from './middlewares/deserializeUser';
import userRouter from './modules/auth/user.route';
import http from "http";
import configureSocket from "./socket";
import { fanCalling, lightCalling, rfidCalling, temperatureCalling } from './utils/adafruitApi';
import rfidRouter from './modules/rfid/rfid.route';
import vehicleRouter from './modules/vehicle/vehicle.route';
import parkingSlotRouter from './modules/parkingSlot/parkingSlot.route';
import customerRouter from './modules/customer/customer.route';
import ResponseBody from './utils/responseBody';
import logRouter from './modules/log/log.route';
import statisticRouter from './modules/statistic/statistic.route';

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}  

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/auth', userRouter)
app.use('/vehicles', vehicleRouter)
app.use('/rfid', rfidRouter)
app.use('/parkingSlot', parkingSlotRouter)
app.use('/customer',customerRouter)
app.use('/log',logRouter)
app.use('/statistic', statisticRouter)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(new ResponseBody("Error", message, null))
})
export const io = configureSocket(server);
server.listen(port, () => {
    log.info(`Server is running on port ${port}`)
    temperatureCalling();
    lightCalling();
    rfidCalling();
});