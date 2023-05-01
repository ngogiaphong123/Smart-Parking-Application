import { NextFunction, Request, Response } from "express";
import {loadModel, predict} from './AI'
loadModel()

const aiAnswerHandle = async (req: Request, res: Response, next: NextFunction) => {
    let { fromHuman } = req.body
    let {outputIndex, answers, outputIndexActionTable} = predict(fromHuman)
    let randomIndex = Math.floor(Math.random() * answers.answers.length)
    let randomAnswer = answers.answers[randomIndex]
    res.status(200).json({ status:"Success", message: randomAnswer, outputIndex:outputIndex, outputIndexActionTable})
}

export default aiAnswerHandle;