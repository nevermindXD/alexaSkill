import express from 'express';

const app = express.Router();

app.group('/service', (router) => {
    router
        .get("/:id",  (req, res, next) => {
           res.send({message: 'hello'});
        });
});

export default app;