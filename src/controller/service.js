import { Service } from '../models';

export const listAll = () => {
    return Service
        .find().then(services => {
            return services;
        }).catch( err => {
            console.debug(err);
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

export const addOne = (service) => {
    var newService = new Service(service);

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