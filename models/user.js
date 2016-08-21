var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/userDB');

var userSchema = mongoose.Schema({
    local : {
        email: String,
        password: String
    },
    facebook : {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;