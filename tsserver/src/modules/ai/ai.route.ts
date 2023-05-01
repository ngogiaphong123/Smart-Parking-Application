import express from 'express';
import aiAnswerHandle from './ai.controller';
const aiRouter = express.Router();

aiRouter.post('/aiAnswer', aiAnswerHandle) 
aiRouter.get('/test', (req, res) => {
    res.send('Hello World!');
})
export default aiRouter; 