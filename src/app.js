import express from 'express';
import cors from 'cors';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { errorHandler } from './libraries/response/errorHandler';
import routes from './components';

require('express-async-errors');

// I'm using "require" to remove morgan warning error when using import and esm
const morgan = require('morgan');

const app = express();
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const corsOptions = {
  credentials: true,
  origin: [],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    name: 'redit-01',
    store: new RedisStore({
      client: redisClient, disableTouch: true, host: 'localhost', port: 6379,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // cookie only works in https
    },
    saveUninitialized: false,
    secret: process.env.REDIS_SECRET,
    resave: false,
  }),
);

// TODO: remove comments
app.use((req, _res, next) => {
  if (!req.session) {
    return next(new Error('oh no')); // handle error
  }
  next(); // otherwise continue
});

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
