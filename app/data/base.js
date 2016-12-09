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

        post(params, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .insert(body)
                    .then(resolve)
                    .catch(reject);
            });
        }

        getMultiple(params, query) {
            return new Promise((resolve, reject) => {
                global.knex
                    .from(params.table)
                    .where(query)
                    .then(resolve)
                    .catch(reject);
            });

        }

        getOne(params) {
            return new Promise((resolve, reject) => {
                global.knex
                    .from(params.table)
                    .where('id', params.id)
                    .then((data) => {
                        if (data.length) {
                            resolve(data[0]);
                        } else {
                            reject({});
                        }
                    })
                    .catch(reject);
            });
        }

        put(params, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .where('id', params.id)
                    .update(body)
                    .then((data) => {
                        if (data === 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    })
                    .catch(reject);
            });
        }

        patch(params, body) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .where('id', params.id)
                    .update(body)
                    .then((data) => {
                        if (data === 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    })
                    .catch(reject);
            });
        }

        delete(params) {
            return new Promise((resolve, reject) => {
                global.knex(params.table)
                    .where('id', params.id)
                    .del()
                    .then((data) => {
                        if (data === 1) {
                            resolve(data);
                        } else {
                            reject(data);
                        }
                    })
                    .catch(reject);
            });
        }

    };

    module.exports = Base;

})();
