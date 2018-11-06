const express = require('express');
const bodyParser = require('body-parser');
var formidable = require('formidable');
util = require('util');
const app = express();
const port = 4000;
var path = require('path');

var fs = require('fs');

const data = require('./data');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/uploads/:type/:file', (req, res) => {
    let file = req.param('file');
    let type = req.param('type');
    res.sendFile(path.join(__dirname, '/uploads/', type, file));
})

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
        // res.writeHead(200, {'content-type': 'text/plain'});
        form.parse(req, function (err, fields, files) {
            util.inspect({fields: fields, files: files});
        });
        form.on('fileBegin', function (name, file) {
            file.path = path.join(__dirname, '/uploads/background/', file.name);
        });
        form.on('file', function (name, file) {
            let filename = path.join(__dirname, '/uploads/background/', file.name);
            console.log(filename);
            console.log(__dirname);
            // fs.readFile(filename, "utf8", function(err, data) {
            //     if (err) throw err;
                // console.debug("FILE CONTENT: ", data);
                // res.write(data);
                //let img = new Buffer(data, 'base64');
                // res.writeHead(200, {
                //     'Content-Type': 'image/*',
                //     // 'Content-Length': data.length
                // });
                // console.log('__dirname:\n', __dirname);
                // console.log(path.resolve( __dirname, '../src/static/uploads/background/'+file.name));
                //res.sendFile(path.resolve( __dirname, '../src/static/uploads/background/'+file.name));
                // console.log(data);
                // res.send(new Buffer(data).toString('base64'))
            // });
            // console.log(file.path);
            res.send({
                url: `localhost:4000/uploads/background/${file.name}`
            });
            // res.sendFile(path.join(__dirname,'/uploads/background/', file.name));
        });
    }
});

app.post('/upload/logo', (req, res) => {
    if (req.url === '/upload/logo' && req.method.toLowerCase() === 'post') {
        // let form = new formidable.IncomingForm();
        // res.writeHead(200, {'content-type': 'text/plain'});
        // form.parse(req, function (err, fields, files) {
        //     res.end(util.inspect({fields: fields, files: files}));
        // });
        // form.on('fileBegin', function (name, file) {
        //     file.path = path.join(__dirname, '..', '/src/static/uploads/logo/', file.name);
        // });
        // form.on('file', function (name, file) {
        //     console.log(file.path);
        //     res.end('../src/static/uploads/logo/'+file.name);
        // });

        let form = new formidable.IncomingForm();
        // res.writeHead(200, {'content-type': 'text/plain'});
        form.parse(req, function (err, fields, files) {
            util.inspect({fields: fields, files: files});
        });
        form.on('fileBegin', function (name, file) {
            file.path = path.join(__dirname, '/uploads/logo/', file.name);
        });
        form.on('file', function (name, file) {
            let filename = path.join(__dirname, '/uploads/logo/', file.name);
            res.send({
                url: `localhost:4000/uploads/logo/${file.name}`
            });
        });
    }
});

app.listen(port, () => console.log(`listening on port ${port}!`));
