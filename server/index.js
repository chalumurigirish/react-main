import 'dotenv/config';
import express from 'express';
import log4js from 'log4js';
import cors from 'cors';
import mongoose from 'mongoose';
import Todo from './models/todo.js';

import TodoRouter from './routes/todo.js';

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

log4js.configure({
  appenders: {
    app: { type: 'file', filename: 'app.log' },
    out: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['app', 'out'], level: 'debug' },
  },
});

const logger = log4js.getLogger('In Index File');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', TodoRouter);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server listening on Port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.fatal(`connection to MongoDB failed with error ${error.message}`);
  });

// app.listen(PORT, () => {
//   logger.info(`Server listening on Port ${PORT}`);
// });
