var mongoose = require('mongoose'),
    Schemae = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10

var SessionSchema = new Schemae({
    sessionid: { type: String, required: true, index: { unique: true } },
    sessionname: { type: String, required: false },
    servername: { type: String, required: false },
    username: { type: String, required: false },
    userip: { type: String, required: false },
    usersecret: { type: String, required: false },
    exprires: {type:Date,  required: false}
});

SessionSchema.pre('save', function(next) {
    var session = this;

    // only hash the password if it has been modified (or is new)
    if (!session.isModified('sessionid')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(session.username, salt, function (err, hash) {
            if (err) return next(err);

            // set the hashed password back on our user document
            session.usersecret = hash;
            //session.sessionid = session.makeid;
            next();
        });
    });
});

SessionSchema.statics.getSession = function(inputsession, cb) {
    this.findOne({ sessionid: inputsession.sessionid }, function(err, session) {
        if (err) return cb(err);

        // make sure the session exists
        if (!session) {
        inputsession.save(function(err) {
            if (err) throw err;

          });
        }
    });
};

//UserSchema.methods.makeid = function( cb) {
//  var text = "";
//  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//  for( var i=0; i < 5; i++ )
//      text += possible.charAt(Math.floor(Math.random() * possible.length));

//  return text;
//    }
//}





module.exports = mongoose.model('Session', SessionSchema);
