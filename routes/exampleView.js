var express = require('express');
var router = express.Router();

router.get('/view', function (req, res) {
    res.render('exampleView', { msg: 'Example View Data' });
});

module.exports = router;
