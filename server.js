var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var morganBody = require('morgan-body');
var rfs = require('rotating-file-stream');
var path = require('path');
var fs = require('fs');
var auth = require('http-auth');


app = express();
var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Config
app.use(helmet());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static('views')); // set views directory
app.set('view engine', 'ejs');    // set the view engine to ejs

// create a rotating write stream
var accessLogStream = rfs('access.log', {
	interval: '7d', // rotate weekly
	path: logDirectory
});
  
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));
morganBody(app);

// create a basic auth HTTP
var basic = auth.basic({
	realm: "Web."
}, function (username, password, callback) { // Custom authentication method.
	callback(username === config.logUsername  && password === config.logPassword );
});


// Routing
app.use('/', require('./serverRouter'));

app.get('/log', auth.connect(basic), function (req, res) {
	fs.readFile(path.join(__dirname,'log')+'/console.log', "utf8", function(err, data){
		if(err) throw err;
		res.send(data.toString().replace(/(?:\r\n|\r|\n)/g, '<br/>'));
	});
});

app.get('/', function (req, res) {
	res.status(200).send('Hello World');
});


// Init
var models = require('./models/_index');
models.waterline.initialize(models.config, function (err, models) {
	if (err) throw err;

	app.models = models.collections;		//Save global models
	app.connections = models.connections;	//Save global connections

	// Start Server
	if (process.env.PORT) {
		//if server is deployed at Heroku Cloud
		app.listen(process.env.PORT, function () {
			console.log('\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/')
			console.log('   Server running on port: ' + process.env.PORT);
			console.log('/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\');
		});
	}
	else {
		// local environment
		app.listen(config.localPort, config.localUrl, function () {
			console.log('\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/')
			console.log('   Server running on: ', config.localUrl + ':' + config.localPort);
			console.log('/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\');
		});
	}
});


