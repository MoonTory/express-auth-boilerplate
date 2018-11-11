import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorCatch, errorHandler } from '../utils/middleware';

// Config
import { NODE_ENV } from '../config';

import apiRouter from '../api/routes';

const app = express();

// << - Middleware Stack - >>
app.use(helmet());
app.use(cors());
app.use(morgan(NODE_ENV));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// << - Routes - >>
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(errorCatch);

// error handler
app.use(errorHandler);

export default app;