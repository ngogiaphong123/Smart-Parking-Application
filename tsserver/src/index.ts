import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ExpressError from './utils/expressError';
import { StatusCodes } from 'http-status-codes';
import log from './utils/logger';
import deserializeUser from './middlewares/deserializeUser';
import userRouter from './modules/user/user.route';
import http from "http";
import configureSocket from "./socket";
import { fanCalling, lightCalling, temperatureCalling } from './utils/adafruitApi';
import sensorRouter from './modules/sensor/sensor.route';

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
app.use('/sensors',sensorRouter)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message)
})
export const io = configureSocket(server);
server.listen(port, () => {
    log.info(`Server is running on port ${port}`)
    temperatureCalling();
    lightCalling();
    fanCalling();
});