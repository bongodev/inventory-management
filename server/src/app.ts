import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';
import session from 'express-session';

import { envConfig, connectDB } from '@/config';
import configureRouters from '@/routes';
import { errorHandler } from '@/middlewares';

import './auth/strategy';

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: envConfig.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(
  session({
    secret: envConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Init passport middleware
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configureRouters(app);
app.use(errorHandler);

const port = envConfig.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();