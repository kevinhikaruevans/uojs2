const express = require('express');
module.exports = (uodatareader) => {
    express()
        .use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            return next();
        })
        .get('/land/:id', (req, res) => {
            const id = ~~req.params.id;
            const bitmap = uodatareader.art.loadLand(id);
            bitmap.png().toBuffer((err, buffer) => {
                res.header('Content-Type', 'image/png');
                res.end(buffer);
            });
        })
        .get('/texture/:id', (req, res) => {
            const id = ~~req.params.id;
            const bitmap = uodatareader.texture.loadTexture(id);
            bitmap.png().toBuffer((err, buffer, info) => {
                console.log(info);
                res.header('Content-Type', 'image/png');
                res.end(buffer);
            });
        })
        .listen(80);
};
