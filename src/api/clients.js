import express from 'express';
import * as clientCtrl from '../controller/client';
import * as servieCtrl from '../controller/service';

const app = express.Router();

app.group('/clients', (router) => {
    router
    .get('/',  (req, res) => {
       clientCtrl.listAll()
        .then( clientlist => {
            res.status(200).json(clientlist);
        })
        .catch(err => {
			res.status(200).send(err);
		});
    })
    .post('/', (req,res) => {
        clientCtrl.addOne(req.body)
        .then( client => {
            res.status(200).json(client);
        })
        .catch(err => {
			res.status(200).send(err);
		});
    })
    .delete('/', (req,res) => {
        clientCtrl.deleteOne(req.body.id)
        .then( () => {
            res.status(200).json({message: 'Eliminado correctamente'});
        })
        .catch(err => {
			res.status(200).send(err);
		});
    })
    .post('/services', (req,res) => {
        servieCtrl.addOne(req.body)
        .then( service => {
            res.status(200).json(service);
        })
        .catch(err => {
			res.status(200).send(err);
		});
    })
    .get('/services/last/:mail', (req,res) => {
        clientCtrl.getOneMail(req.params.mail)
        .then( client => {
            servieCtrl.getAllServiceDesc(client[0]._id)
                .then( serviceList => {
                    res.status(200).json(serviceList);
                })
                .catch(err => {
                    res.status(200).send(err);
                });
        })
        .catch(err => {
			res.status(200).send(err);
		});
        
    })
});

export default app;