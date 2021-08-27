import express from 'express';
import cors from 'cors';
import routes from './components';
import { errorHandler } from './libraries/response/errorHandler';

require('express-async-errors');

// I'm using "require" to remove morgan warning error when using import and esm
const morgan = require('morgan');

const app = express();

const corsOptions = {
  credentials: true,
  origin: [],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app routes
app.get('/', (req, res) => res.status(301).redirect('/api/v1'));
app.get('/api/v1', (req, res) => res.status(200).send({
  statusCode: 200,
  message: 'Welcome to Bookstore API',
}));
app.use('/api/v1', routes);
app.all('*', (req, res) => res.status(404).send({
  status: 404,
  message: `Can't find route [ ${req.originalUrl} ] on this server`,
}));
app.use(errorHandler);

export default app;
