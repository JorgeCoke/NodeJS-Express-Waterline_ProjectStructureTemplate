var express = require('express');
var router = express.Router();

router.use('/auth', require('./routes/auth/authRouter'));

router.use('/user', require('./routes/user/userRouter'));

router.use('/middleware', require('./routes/exampleMiddleware'));

router.use('/mailSender', require('./routes/mailSender/mailSenderRouterExample'));

router.use('/', require('./routes/exampleView'));

router.use('/', require('./routes/example'));

module.exports = router;
