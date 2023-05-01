import express from 'express';
import aiAnswerHandle from './ai.controller';
const aiRouter = express.Router();

aiRouter.post('/aiAnswer', aiAnswerHandle) 

export default aiRouter;  