import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { errorCatch, errorHandler, connectDb } from '../utils/middleware';

// Config
import { NODE_ENV } from '../config';

// API Router Import
import api from '../api/routes';

// Initialising Express
const app = express();

// << - Middleware Stack - >>
app.use(helmet());
app.use(cors());
app.use(morgan(NODE_ENV));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// << - Routes - >>
app.use('/api', api);

// Connect to DB
connectDb();

// catch 404 and forward to error handler
app.use(errorCatch);

// error handler
app.use(errorHandler);

export default app;