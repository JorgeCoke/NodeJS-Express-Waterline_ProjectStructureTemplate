var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var path = require('path');

router.post('/', function (req, res) {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
    app.models.user.create(user).then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        console.log('err: ', err);
        res.status(500).send({error:'Error al crear usuario'});
    });
});

router.get('/', function (req, res) {
    app.models.user.find().then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        console.log('err: ', err);
        res.status(500).send({error:'Error al obtener usuarios'});
    });
});

module.exports = router;
