const knex = require('knex')({
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

        post(req, res, next) {
            knex(req.params.table)
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

        get(req, res, next) {
            knex
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
            knex(req.params.table)
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
            knex(req.params.table)
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
            knex(req.params.table)
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
