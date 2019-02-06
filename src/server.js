require('dotenv').config()

import 'express-group-routes';
import express from 'express';

import { utils } from './config/utils'
import { server } from './config/server';

import API from './api';

const PORT = process.env.PORT || 3001

const app = express();

utils(app);

app.get('/', (req, res) => {
    res.send('Hello world!!!')
});

app.use('/',API);

server(app,PORT);