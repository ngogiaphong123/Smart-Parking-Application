import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ExpressError from './utils/expressError';
import { StatusCodes } from 'http-status-codes';
import log from './utils/logger';
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}  

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELET  E'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message)
})
app.listen(port, () => {
    log.info(`Server is running on port ${port}`)
});