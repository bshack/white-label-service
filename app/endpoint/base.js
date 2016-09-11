const knex = require('knex');

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

        post(req, res, next) {
            global.knex(req.params.table)
                .insert(req.body)
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        data: error
                    });
                })
                .then((data) => {
                    res.json({
                        status: true,
                        data: data
                    });
                });
        }

        getOne(req, res, next) {
            global.knex
                .select('*')
                .from(req.params.table)
                .where({
                    id: req.params.id
                })
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        data: error
                    });
                })
                .then((data) => {
                    if (data.length) {
                        res.json({
                            status: true,
                            data: data[0]
                        });
                    } else {
                        res.status(404).json({
                            status: false,
                            data: data
                        });
                    }
                });
        }

        getMultiple(req, res, next) {
            global.knex
                .select('*')
                .from(req.params.table)
                .where(req.query)
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        data: error
                    });
                })
                .then((data) => {
                    if (data.length) {
                        res.json({
                            status: true,
                            data: data
                        });
                    } else {
                        res.status(404).json({
                            status: false,
                            data: data
                        });
                    }
                });
        }

        put(req, res, next) {
            global.knex(req.params.table)
                .where('id', req.params.id)
                .update(req.body)
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        data: error
                    });
                })
                .then((data) => {
                    if (data === 1) {
                        res.json({
                            status: true,
                            data: data
                        });
                    } else {
                        res.json({
                            status: false,
                            data: data
                        });
                    }
                });
        }

        patch(req, res, next) {
            global.knex(req.params.table)
                .where('id', req.params.id)
                .update(req.body)
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        data: error
                    });
                })
                .then((data) => {
                    if (data === 1) {
                        res.json({
                            status: true,
                            data: data
                        });
                    } else {
                        res.json({
                            status: false,
                            data: data
                        });
                    }
                });
        }

        delete(req, res, next) {
            global.knex(req.params.table)
                .where('id', req.params.id)
                .del()
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        data: error
                    });
                })
                .then((data) => {
                    if (data === 1) {
                        res.json({
                            status: true,
                            data: data
                        });
                    } else {
                        res.status(404).json({
                            status: false,
                            data: data
                        });
                    }
                });
        }

    };

    module.exports = Base;

})();
