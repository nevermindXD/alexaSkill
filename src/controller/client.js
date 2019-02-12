import { Client } from '../models';

export const listAll = () => {
    return Client
        .find().then(clients => {
            return clients;
        }).catch( err => {
            console.debug(err);
            return 'Something went wrong';
        });
};

export const getOne = (id) => {
    return Client.findById(id)
        .then(client => {
            return client;
        }).catch(() => {
            return 'Something went wrong';
        });
};

export const addOne = (client) => {
    var newClient = new Client(client);

    return newClient
        .save()
        .then(client => {
            return client;
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
    return Client.findById(id)
        .then(client => {
            if (client === null) {
                let response = {
                    message: 'Something went wrong ',
                    error: 'id ' + id + ' doesnt exist'
                };
                return response;
            }
            else
                client.remove()
                    .then(client => {
                        return client;
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
    return Client.update(byId, query)
        .then(client => {
            return client;
        })
        .catch(err => {
            let response = {
                message: 'Somethign went wrong',
                error: err.message
            };
            return response;
        });


};