import express, { Request, Response } from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { shouldBeUser } from './middleware/authMiddleware.js';


const app = express();
app.use(clerkMiddleware())

app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3003'], credentials: true
}))

app.get('/health', (req: Request, res: Response) => {

    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})

app.get('/test', shouldBeUser, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Product Service: You are logged in!', userId: req.userId });
})

app.listen(3000, () => {
    console.log('Product service is running on port 3000');
})