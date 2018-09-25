const express = require('express');
const bodyParser = require('body-parser');
var formidable = require('formidable');
util = require('util');
const app = express();
const port = 4000;
var path = require('path');

const data = require('./data');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/:key(*)', (req, res) => {
    res.json(data.get(req.params.key));
});

app.put(':/key(*)', (req, res) => {
    data.set(req.params.key, req.body);
    res.json({
        status: "ok",
        payload: data.get(req.params.key)
    });

});

app.post('/upload/background', (req, res) => {
    if (req.url === '/upload/background' && req.method.toLowerCase() === 'post') {
        let form = new formidable.IncomingForm();
        res.writeHead(200, {'content-type': 'text/plain'});
        form.parse(req, function (err, fields, files) {
            res.end(util.inspect({fields: fields, files: files}));
        });
        form.on('fileBegin', function (name, file) {
            file.path = path.join(__dirname, '..', '/src/static/uploads/background/', file.name);
        });
        form.on('file', function (name, file) {
            res.end(file.name);
        });
    }
});

app.post('/upload/logo', (req, res) => {
    console.log(req.method);
    console.log(req.url);
    if (req.url === '/upload/logo' && req.method.toLowerCase() === 'post') {
        let form = new formidable.IncomingForm();
        res.writeHead(200, {'content-type': 'text/plain'});
        form.parse(req, function (err, fields, files) {
            res.end(util.inspect({fields: fields, files: files}));
        });
        form.on('fileBegin', function (name, file) {
            file.path = path.join(__dirname, '..', '/src/static/uploads/logo/', file.name);
        });
        form.on('file', function (name, file) {
            console.log(file.name);
            res.end(file.name);
        });
    }
});

app.listen(port, () => console.log(`listening on port ${port}!`));
