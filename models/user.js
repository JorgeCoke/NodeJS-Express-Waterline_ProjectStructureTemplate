var Waterline = require('Waterline');

var User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'myConnection', //Name of the Waterline connection

    attributes: {
        email: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },


    beforeCreate: function (values, next) {
        // Generate hash before create a model
        if (!values.password || values.password == "") {
            return next('Password invalida');
        }
        var hashPassword = require('bcrypt').hashSync(values.password, 10);
        values.password = hashPassword;
        next();
    }
});

module.exports = User;