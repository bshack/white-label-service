const express = require('express');
const app = express();
const fs = require('fs');
const http2 = require('spdy');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemcachedStore = require('connect-memcached')(session);
const BaseEndpoint = require('./data/base');
const AuthenticationEndpoint = require('./data/authentication');

let baseEndpoint = new BaseEndpoint();
let authenticationEndpoint = new AuthenticationEndpoint();

app.use(helmet());
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());
app.use(session({
    name: 'white-label-model',
    //change me when in prod
    secret: 'ohs"ZZjO}F8Nu.6sd#:&4X6Pu/4Sj7;Z(sb.G~^0m[(w86V4rh0cwbvcY1X>52D',
    maxAge: 7200000,
    sameSite: true,
    resave: false,
    saveUninitialized: true,
    proxy: false,
    rolling: true,
    cookie: {
        secure: true
    },
    store: new MemcachedStore({
        hosts: ['127.0.0.1:11211'],
        //change me when in prod
        secret: 'ohs"ZZjO}F8Nu.6sd#:&4X6Pu/4Sj7;Z(sb.G~^0m[(w86V4rh0cwbvcY1X>52D'
    })
}));

app.post('/authentication', (req, res, next) => {
    authenticationEndpoint.signOut(req.session)
        .then((result) => {
            authenticationEndpoint.authentication(req.body, req.session)
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
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});

app.post('/signOut', (req, res, next) => {
    authenticationEndpoint.signOut(req.session)
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

app.post('/forgotPassword', (req, res, next) => {
    authenticationEndpoint.signOut(req.session)
        .then((result) => {
            authenticationEndpoint.forgotPassword(req.body)
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
        })
        .catch((result) => {
            res.status(500).json({
                status: false,
                data: result
            });
        });
});


//


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
    console.log(req.session.id, req.session.user);
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
