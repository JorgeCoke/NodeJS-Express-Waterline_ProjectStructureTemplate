var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.superSecret, function (err, decoded) {
      if (err) {
        res.status(500).send({error:'Authentication error'});
      } else {
        // if everything is good, save to request for use in other routes
        req.emailDecoded = decoded; //Save email
        next();
      }
    });
  } else {
    // if there is no token return an error
    res.status(403).send({error:'No token provided'});
  }
};