import { NextFunction, Request, Response } from "express";
import {loadModel, predict} from './forTraining'
loadModel()

const aiAnswerHandle = async (req: Request, res: Response, next: NextFunction) => {
    let { fromHuman } = req.body
    let {answers} = predict(fromHuman)
    let randomIndex = Math.floor(Math.random() * answers.length)
    let randomAnswer = answers[randomIndex]
    res.status(200).json({ status:"Success", message: randomAnswer })
}

export default aiAnswerHandle;