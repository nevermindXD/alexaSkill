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
    const {When, Schedule} = service;
    var newService = new Service(service);
    newService.DateService = new Date(service.When).toISOString();
    let query = { When, Schedule, Complete: false  };
    return Service.find(query)
		.then(serviceList => {
            return Client.find({Mail: service.Mail})
            .then( client => { 
                if(serviceList.length < 1){
                    client[0].Service.push(newService._id);
                    client[0].save(err=>{
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
                    return 'Servicio no disponible para ese dia';
                }
            }).catch(() => {
                return 'Ups!, algo salio mal, vuelve a intentrlo Client';
            });   
		}).catch(() => {
			return 'Ups!, algo salio mal, vuelve a intentrlo Service';
		});        
};

export const deleteOne = (id) => {
    return Service.findById(id)
        .then(service => {
            if (service === null) {
                let response = {
                    message: 'Ups!, algo salio mal, vuelve a intentrlo ',
                    error: 'id ' + id + ' doesnt exist'
                };
                return response;
            }
            else
                service.remove()
                    .then(service => {
                        return service;
                    })
                    .catch(() => {
                        return 'Ups!, algo salio mal, vuelve a intentrlo';
                    });
        }).catch(() => {
            let response = {
                message: 'Ups!, algo salio mal, vuelve a intentrlo ',
                error: 'id ' + id + ' doesnt exist'
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

export const getAllServiceDesc = (Client) => {
    let query = {Client, Complete: false};
	return Service.find(query).sort('-date')
		.then(serviceList => {
            serviceList.reverse();
            if(serviceList.length === 0){
                return 'No tienes ningun servicio proximo agendado';
            }else{
                let date = serviceList[0].When.getFullYear() + '-' + serviceList[0].When.getMonth() + '-' + serviceList[0].When.getDate();
                return 'Servicio agendado para el ' + date + ' por la ' + serviceList[0].Schedule + ', Pronto nos pondremos en contacto para establecer algunos detalles';
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