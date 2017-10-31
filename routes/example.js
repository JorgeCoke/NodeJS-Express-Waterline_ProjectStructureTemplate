var express = require('express');
var router = express.Router();

router.get('/example', function (req, res) {
    res.status(200).send('Ok');
});

module.exports = router;
