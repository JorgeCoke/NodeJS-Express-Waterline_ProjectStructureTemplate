var express = require('express');
var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var helmet = require('helmet');

app = express();

// Config
app.use(helmet());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static('views')); // set views directory
app.set('view engine', 'ejs');    // set the view engine to ejs

// Routing
app.use('/', require('./serverRouter'));

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


