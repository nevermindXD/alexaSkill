import express from 'express';
import * as servieCtrl from '../controller/service';

const app = express.Router();

app.group('/services', (router) => {
    router
    .get('/',  (req, res) => {
        servieCtrl.listAll()
         .then( serviceList => {
             res.status(200).json(serviceList);
         })
         .catch(err => {
             res.status(200).send(err);
         });
     })
     
});

export default app;