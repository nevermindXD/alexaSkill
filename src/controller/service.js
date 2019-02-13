import { Service } from '../models';
// import { Calendar } from './calendar';

export const listAll = () => {
    return Service
        .find().then(services => {
            return services;
        }).catch(() => {
            return 'Something went wrong';
        });
};

export const getOne = (id) => {
    return Service.findById(id)
        .then(service => {
            return service;
        }).catch(() => {
            return 'Something went wrong';
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
            if(serviceList.length < 1){
                return newService
                .save()
                .then(service => {    
                    return service;
                })
                .catch(err => {
                    let response = {
                        message: 'Something went wrong',
                        error: err.message
                    };
                    return response;
                });
            }else{
                return 'Servicio no disponible para ese dia';
            }
		}).catch(() => {
			return 'Something went wrong';
		});        
};

export const deleteOne = (id) => {
    return Service.findById(id)
        .then(service => {
            if (service === null) {
                let response = {
                    message: 'Something went wrong ',
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
                        return 'Something went wrong';
                    });
        }).catch(() => {
            let response = {
                message: 'Something went wrong ',
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
                console.log('no mas')
                return false;
            }else{
                return true;
            }
		}).catch(() => {
			return 'Something went wrong';
		});
};

export const getAllServiceDesc = (Client) => {
    let query = {Client, Complete: false};
	return Service.find(query).sort('-date')
		.then(serviceList => {
			// serviceList.reverse();
			return serviceList;
		}).catch(e => {
            console.log(e);
			return 'Something went wrong';
		});
};

export const getAllServicesClient = (Client) => {
    let query = {Client};
    return Service.find(query)
    .then(serviceList => {
        return serviceList;
    }).catch(() => {
        return 'Something went wrong';
    });
};