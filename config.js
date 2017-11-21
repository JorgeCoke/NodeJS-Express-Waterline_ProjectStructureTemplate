var diskAdapter = require('sails-disk');
var config = {};
var isDevelopmentEnvironment = true;

if (isDevelopmentEnvironment){
    config.localUrl = '0.0.0.0';
    config.localPort = '8001';
} else {
    config.localUrl = '0.0.0.0';
    config.localPort = '8001';
}

config.logUsername = 'root';
config.logPassword = 'toor';

// Seed for hash JWT
config.superSecret = 'SecretJwtGenerator@JorgeCoke';

// Adapters List: https://github.com/balderdashy/sails-docs/blob/1.0/concepts/extending-sails/Adapters/adapterList.md#sails-disk
config.database = {
    adapters: {
        diskAdapter: diskAdapter
    },
    connections: {
        diskAdapterConnection: {
            adapter: 'diskAdapter',
            inMemoryOnly: false     //false to force save local data in .tmp/myConnection.db file
        }
    }
};

//MailSender
config.mailSender = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'XXXXXXXXX@gmail.com',
        pass: 'YYYYYYYYY'
    }
  };

module.exports = config;