const knex = require('knex');
const Promise = require('bluebird');

global.knex = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',

        database: 'white-label-model'
    }
});

(() => {

    'use strict';

    const Base = class {

        constructor() {

        }

        post(params, query, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .insert(body)
                    .catch((error) => {
                        reject(error);
                    })
                    .then((data) => {
                        resolve(data);
                    });
            });
        }

        getOne(params, query, body) {
            return new Promise((resolve, reject) => {
                global.knex
                    .select('*')
                    .from(params.table)
                    .where({
                        id: params.id
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .then((data) => {
                        if (data.length) {
                            resolve(data[0]);
                        } else {
                            reject({});
                        }
                    });
            });
        }

        getMultiple(params, query, body) {
            return new Promise((resolve, reject) => {
                global.knex
                    .select('*')
                    .from(params.table)
                    .where(query)
                    .catch((error) => {
                        reject(error);
                    })
                    .then((data) => {
                        resolve(data);
                    });
            });

        }

        put(params, query, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .where('id', params.id)
                    .update(body)
                    .catch((error) => {
                        reject(error);
                    })
                    .then((data) => {
                        if (data === 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    });
            });
        }

        patch(params, query, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .where('id', params.id)
                    .update(body)
                    .catch((error) => {
                        reject(error);
                    })
                    .then((data) => {
                        if (data === 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    });
            });
        }

        delete(params, query, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .where('id', params.id)
                    .del()
                    .catch((error) => {
                        reject(error);
                    })
                    .then((data) => {
                        if (data === 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    });
            });
        }

    };

    module.exports = Base;

})();
