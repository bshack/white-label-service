const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());

app.post('/user', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        id: '12'
    });
});

app.get('/user/:userId', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        id: req.params.userId
    });
});

app.put('/user/:userId', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        id: req.params.userId
    });
});

app.patch('/user/:userId', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        id: req.params.userId
    });
});

app.delete('/user/:userId', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        id: req.params.userId
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
