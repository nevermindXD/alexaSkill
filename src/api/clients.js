import express from 'express';

const app = express.Router();

app.group('/clients', (router) => {
    router
    .get("/",  (req, res, next) => {
       res.send({message: 'hello'});
    });
});

export default app;