import { Service, Client } from '../models';
// import { Calendar } from './calendar';

export const listAll = () => {
    return Service
        .find().then(services => {
            return services;
        }).catch(() => {
            return 'Ups!, algo salio mal, vuelve a intentrlo';
        });
};

export const getOne = (id) => {
    return Service.findById(id)
        .then(service => {
            return service;
        }).catch(() => {
            return 'Ups!, algo salio mal, vuelve a intentrlo';
        });
};
/**
 * Missing check the client can have 2 services in one day
 */
export const addOne = (service) => {
    const {When, Schedule ,ClientID} = service;
    var newService = new Service(service);
    newService.DateService = new Date(service.When).toISOString();
    let query = { When, Schedule, Complete: false  };
    return Service.find(query)
		.then(serviceList => {
            if(serviceList.length <2){
                return Client.findById(ClientID)
                .then( client => { 
                    if(serviceList.length < 1){
                        client.Service.push(newService._id);
                        newService.Client = client._id; 
                        client.save(err=>{
                            if(err){
                                return err;
                            }
                        });
                        return newService
                        .save()
                        .then(service => {    
                            return service;
                        })
                        .catch(err => {
                            let response = {
                                message: 'Ups!, algo salio mal, vuelve a intentrlo',
                                error: err.message
                            };
                            return response;
                        });
                    }else{
                        let response = {
                            message: 'Ya tienes un servicio agendado para ese día',
                        };
                        return response
                    }
                }).catch( err  => {
                    console.log(err);
                    return 'Ups!, algo salio mal, vuelve a intentrlo Client';
                }); 
                

            }else{
                let response = {
                    message: 'Servicio no disponible para ese día',
                    error: err.message
                };
                return response
            }
		}).catch( err => {
            console.log(err);
			return 'Ups!, algo salio mal, vuelve a intentrlo Service';
		});        
};

export const deleteOne = (id) => {
    return Service.findByIdAndDelete(id)
        .then(() => {
            let response = {
                message: 'Tu próximo servicio a sido cancelado'
            };
            return response;
        }).catch( err => {
            console.log(err);
            let response = {
                message: 'Algo salió mal comunícate con nosotros lo antes posible'
            };
            return response;
        });
};


export const updateOne = (id, newInfo) => {
    let byId = { _id: id };
    let query = { $set: newInfo };
    return Service.update(byId, query)
        .then(service => {
            return service;
        })
        .catch(err => {
            let response = {
                message: 'Somethign went wrong',
                error: err.message
            };
            return response;
        });
};

export const dayAvailable = (When ,Schedule) => {
    let query = { When, Schedule, Complete: false  };
    return Service.find(query)
		.then(serviceList => {
            if(serviceList.length >= 1){
                return false;
            }else{
                return true;
            }
		}).catch(() => {
			return 'Ups!, algo salio mal, vuelve a intentrlo';
		});
};

export const getNextServiceDeleteDesc = (Client) => {
    let query = {Client, Complete: false};
	return Service.find(query).sort('-date')
		.then(serviceList => {
            serviceList.reverse();
            if(serviceList.length !== 0){
                return serviceList[0]
            }else{
                return 'No tienes ningún servicio próximo agendado';
            }
		}).catch(() => {
			return 'Ups!, algo salio mal, vuelve a intentrlo';
		});
};

export const getNextServiceDesc = (Client) => {
    let query = {Client, Complete: false};
	return Service.find(query).sort('-date')
		.then(serviceList => {
            console.log(serviceList)
            serviceList.reverse();
            if(serviceList.length !== 0){
                let date = serviceList[0].When.toISOString();
                return 'Servicio agendado para el ' + date.substr(0, 10) + ' por la ' + serviceList[0].Schedule + ', Pronto nos pondremos en contacto para establecer algunos detalles';
            }else{
                return 'No tienes ningún servicio próximo agendado';
            }
		}).catch(() => {
			return 'Ups!, algo salio mal, vuelve a intentrlo';
		});
};

export const getLastServiceDesc = (Client) => {
    let query = {Client, Complete: true};
	return Service.find(query).sort('-date')
		.then(serviceList => {
            serviceList.reverse();
            if(serviceList.length === 0){
                return 'No tienes ningún servicio próximo agendado';
            }else{
                let date = serviceList[0].When.getFullYear() + '-' + serviceList[0].When.getMonth() + '-' + serviceList[0].When.getDate();
                return 'Tu último servicio fue el ' + date + ' por la ' + serviceList[0].Schedule + '.';
            }
		}).catch(() => {
			return 'Ups!, algo salio mal, vuelve a intentrlo';
		});
};


export const getAllServicesClient = (Client) => {
    let query = {Client};
    return Service.find(query)
    .then(serviceList => {
        return serviceList;
    }).catch(() => {
        return 'Ups!, algo salio mal, vuelve a intentrlo';
    });
};