import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';

const app = express();

app.use(
  cors({
    credentials: true
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router());

const server = http.createServer(app);

const MONGO_URL = 'mongodb://localhost:27017/employees';

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to database!'))
  .catch((error) => console.log('Database connecton error'));

mongoose.connection.on('error', (error) => {
  console.log(error.message);
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});
