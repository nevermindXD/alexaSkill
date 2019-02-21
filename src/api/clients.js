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
        clientCtrl.getOneMail(req.body.Mail)
        .then( client => {
            if(client.length === 0){
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }else{
                req.body.Client = client[0]._id
                servieCtrl.addOne(req.body)
                .then( service => {
                    if(service.message){
                        res.status(200).json({message: service.message});
                    }else{
                        let date = service.When.getFullYear() + '-' + service.When.getMonth() + '-' + service.When.getDate();
                        res.status(200).json({message: 'Tu próximo servicio está agendado para el ' + date + ' por la ' + service.Schedule});
                    }
                })
                .catch(() => {
                    res.status(200).json({Message:"Ocurrio un problema intentalo más tarde"});
                });
            }
        })
        .catch(err => {
			res.status(200).send(err);
		});

    })

    .get('/services/next/:mail', (req,res) => {
        clientCtrl.getOneMail(req.params.mail)
        .then( client => {
            if(client.length === 0){
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }else{
                servieCtrl.getNextServiceDesc(client[0]._id)
                    .then( service => {
                        res.status(200).json({message: service});
                    })
                    .catch(err => {
                        res.status(200).send(err);
                    });
            }
        })
        .catch(err => {
			res.status(200).send(err);
		});  
    })

    .delete('/services/next/:mail', (req,res) => {
        clientCtrl.getOneMail(req.params.mail)
        .then( client => {
            if(client.length === 0){
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }else{
                servieCtrl.getNextServiceDesc(client[0]._id)
                    .then( service => {
                        servieCtrl.deleteOne(service._id)
                        .then( service => {
                            res.status(200).json({message: service.message});
                        })
                        .catch(err => {
                            res.status(200).send(err);
                        });
                    })
                    .catch(err => {
                        res.status(200).send(err);
                    });
            }
        })
        .catch(err => {
			res.status(200).send(err);
		});  
    });
});

export default app;