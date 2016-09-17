const express = require('express');
const app = express();
const fs = require('fs');
const http2 = require('spdy');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const BaseEndpoint = require('./data/base');

let baseEndpoint = new BaseEndpoint();

app.use(helmet());
app.use(bodyParser.json());
app.use(compression());

app.post('/:table', (req, res, next) => {
    baseEndpoint.post(req.params, req.body)
        .then((result) => {
            res.json({
                status: true,
                data: result
            });
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

app.get('/:table', (req, res, next) => {
    baseEndpoint.getMultiple(req.params, req.query)
        .then((result) => {
            res.json({
                status: true,
                data: result
            });
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

app.get('/:table/:id', (req, res, next) => {
    baseEndpoint.getOne(req.params)
        .then((result) => {
            res.json({
                status: true,
                data: result
            });
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

app.put('/:table/:id', (req, res, next) => {
    baseEndpoint.put(req.params, req.body)
        .then((result) => {
            res.json({
                status: true,
                data: result
            });
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

app.patch('/:table/:id', (req, res, next) => {
    baseEndpoint.patch(req.params, req.body)
        .then((result) => {
            res.json({
                status: true,
                data: result
            });
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

app.delete('/:table/:id', (req, res, next) => {
    baseEndpoint.delete(req.params)
        .then((result) => {
            res.json({
                status: true,
                data: result
            });
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

http2
    .createServer({
        key: fs.readFileSync(__dirname + '/ssl/local.key', 'utf8'),
        cert: fs.readFileSync(__dirname + '/ssl/local.crt', 'utf8')
    }, app)
    .listen(3000);
