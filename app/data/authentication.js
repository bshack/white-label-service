const knex = require('knex');
const Promise = require('bluebird');
const crypto = require('crypto');

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

        authentication(params, session) {
            return new Promise((resolve, reject) => {
                global.knex
                    .select([
                        'email',
                        'id'
                    ])
                    .from('user')
                    .where({
                        email: params.email,
                        password: params.password
                    })
                    .then((data) => {
                        if (data.length) {
                            session.user = data[0];
                            session.save((error) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(session.user);
                                }
                            });
                        } else {
                            reject({});
                        }
                    })
                    .catch(reject);
            });
        }

        signOut(session) {
            return new Promise((resolve, reject) => {
                session.regenerate((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(session);
                    }
                });
            });
        }

        forgotPassword(params) {
            return new Promise((resolve, reject) => {
                let hash = crypto.createHash('sha256');
                // get email address
                // store reset key in db with timetamp
                // send email with key
                session.regenerate((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(session);
                    }
                });
            });
        }

    };

    module.exports = Base;

})();
