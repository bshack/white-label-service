const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression')

app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',

        database: 'white-label-model'
    }
});

app.post('/user', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    knex('user')
        .insert(req.body)
        .catch(function(error) {
            res.send(error);
        })
        .then((data) => {
            res.send(data);
        });

});

app.get('/user/:id', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    knex
        .select('*')
        .from('user')
        .where({
            id: req.params.id
        })
        .catch(function(error) {
            res.send({
                status: false,
                data: error
            });
        })
        .then((data) => {
            res.send({
                status: true,
                data: data
            });
        });

});

app.put('/user/:id', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    knex('user')
        .where('id', req.params.id)
        .update({
            email: req.body.email
        })
        .catch(function(error) {
            res.send({
                status: false,
                data: error
            });
        })
        .then((data) => {
            if (data === 1) {
                res.send({
                    status: true,
                    data: data
                });
            } else {
                res.send({
                    status: false,
                    data: data
                });
            }
        });

});

app.patch('/user/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    knex('user')
        .where('id', req.params.id)
        .update({
            email: req.body.email
        })
        .catch(function(error) {
            res.send({
                status: false,
                data: error
            });
        })
        .then((data) => {
            if (data === 1) {
                res.send({
                    status: true,
                    data: data
                });
            } else {
                res.send({
                    status: false,
                    data: data
                });
            }
        });
});

app.delete('/user/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    knex('user')
        .where('id', req.params.id)
        .del()
        .catch(function(error) {
            res.send({
                status: false,
                data: error
            });
        })
        .then((data) => {
            if (data === 1) {
                res.send({
                    status: true,
                    data: data
                });
            } else {
                res.send({
                    status: false,
                    data: data
                });
            }
        });

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
