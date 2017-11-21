var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var path = require('path');
var config = require('../../config');
var jwt = require('jsonwebtoken');

router.post('/login', function (req, res) {
  app.models.user.findOneByEmail(req.body.email).then(function (result) {
    if (!result) {
      res.status(500).send({error:'Usuario no existente'});
    } else {
      // check if password matches
      if (bcrypt.compareSync(req.body.password, result.password)) {
        // if user is found and password is right: create a token from email
        var sessionToken = jwt.sign(result.email, config.superSecret, {
          //expiresIn: '24h' // expires in 24 hours
        });
        res.status(200).send({sessionToken:sessionToken});
      } else {
        res.status(500).send({error:'Password incorrecta'});
      }
    }
  }).catch(function (err) {
    console.log('err: ', err);
    res.status(500).send({error:'Error al realizar peticion Login'});
  });
});



module.exports = router;
