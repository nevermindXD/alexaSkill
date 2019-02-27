import express from 'express';
import https from "https";
import http from "http";
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
    /**
     * Proximo servicio mediante get
     * @TODO fix para que se puede hacer con un post mediante http 
     */
    .get('/services/alexa/:Mail/:When/:Schedule', (req,res) => {
        const { Mail, When, Schedule } = req.params;
        const serviceInfo = {
            When,
            Schedule
        };
        clientCtrl.getOneMail(Mail)
        .then( client => {
            if(client.length === 0){
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }else{
                serviceInfo.ClientID = client[0]._id
                servieCtrl.addOne(serviceInfo)
                .then( service => {
                    if(service.message){
                        res.status(200).json({message: service.message});
                    }else{
                        res.status(200).json({message: 'Tu próximo servicio está agendado para el ' + When + ' por la ' + service.Schedule});
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
    /**
     * Siguiente servicio 
     */
    .get('/services/alexa/next/:mail', (req,res) => {
        clientCtrl.getOneMail(req.params.mail)
        .then( client => {
            if(client.length !== 0){
                servieCtrl.getNextServiceDesc(client[0]._id)
                    .then( service => {
                        res.status(200).json({message: service});
                    })
                    .catch(err => {
                        res.status(200).send(err);
                    });
            }else{
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }
        })
        .catch(err => {
			res.status(200).send(err);
		});  
    })
    /**
     * eliminar siguiente servicio
     */
    .get('/services/alexa/deletenext/:mail', (req,res) => {
        clientCtrl.getOneMail(req.params.mail)
        .then( client => {
            if(client.length === 0){
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }else{
                
                servieCtrl.getNextServiceDeleteDesc(client[0]._id)
                    .then( service => {
                        console.log(service);
                        res.status(200).json({message: 'Tu próximo servicio a sido cancelado'}); 
                //         servieCtrl.deleteOne(service._id)
                //         .then( serviceDEl => {
                //             if(serviceDEl === undefined){
                //                 res.status(200).json({message: 'Tu próximo servicio a sido cancelado'}); 
                //             }
                //             if(serviceDEl.message){
                //                 res.status(200).json({message: 'Algo salió mal comunícate con nosotros lo antes posible'});
                //             } 
                //         })
                //         .catch(err => {
                //             console.log(err)
                //             res.status(200).send(err);
                //         });
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(200).send(err);
                    });
            }
        })
        .catch(err => {
			res.status(200).send(err);
		});  
    })

    .get('/services/alexa/last/finish/:mail', (req,res) => {
        clientCtrl.getOneMail(req.params.mail)
        .then( client => {
            if(client.length === 0){
                res.status(200).json({Message:"Usuario no registrado , habla con nuestro soporte técnico para saber qué está sucediendo"});
            }else{
                servieCtrl.getLastServiceDesc(client[0]._id)
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


    .get('/test', (req,res) => {
        var url = 'https://teadsdf.herokuapp.com/api/v1/clients/services/alexa/next' + Mail;

        const request = https.get(options, (response) => {
            response.setEncoding('utf8');
            let returnData = '';
            response.on('data', (chunk) => {
                returnData += chunk;
            });
    
            response.on('end', () => {
              console.log(returnData);
              res.status(200).json(returnData);
            });
    
            response.on('error', (error) => {
                console.log(error);
            });
        });
        request.end();
    });
    
});

export default app;