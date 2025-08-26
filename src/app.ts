import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './app/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/api', router)


app.get('/', (req : Request, res:Response) => res.json({message : 'M Cash Wallet API is Live'}));


export default app;
