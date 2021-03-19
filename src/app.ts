import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import { userRouter } from './routers/user.route';

const app = express();

const corsOptions = {
  origin: "http://localhost:80",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', userRouter);

app.listen(1234, () => {
  console.log('Hello, World!');
});

http.createServer(app).listen(80);
https.createServer({}, app).listen(443);
