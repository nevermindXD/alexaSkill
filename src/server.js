require('dotenv').config()

import 'express-group-routes';
import express from 'express';

import config from './config/db';
import { utils } from './config/utils'
import { server } from './config/server';
import { mongooseConnection } from './utils/connection';
const DB = process.env.MONGODB_URI || config.prod;

mongooseConnection(DB);

import API from './api';

const PORT = process.env.PORT || 3001

const app = express();

utils(app);

app.get('/', (req, res) => {
    res.send('Hello world!!!')
});

app.use('/',API);
app.enable('trust proxy');

server(app,PORT);