const express = require('express');
const app = express();
const fs = require('fs');
const http2 = require('spdy');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const BaseEndpoint = require('./endpoint/base');

let baseEndpoint = new BaseEndpoint();

app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

app.post('/:table', baseEndpoint.post);

app.get('/:table', baseEndpoint.getMultiple);

app.get('/:table/:id', baseEndpoint.getOne);

app.put('/:table/:id', baseEndpoint.put);

app.patch('/:table/:id', baseEndpoint.patch);

app.delete('/:table/:id', baseEndpoint.delete);

http2
    .createServer({
        key: fs.readFileSync(__dirname + '/ssl/local.key', 'utf8'),
        cert: fs.readFileSync(__dirname + '/ssl/local.crt', 'utf8')
    }, app)
    .listen(3000);
