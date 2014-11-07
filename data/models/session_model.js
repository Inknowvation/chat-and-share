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

        charSet =  'ABCDEFGHIJK34567890-)(*&^%$#@#$%^&*({}":LKJHGFDFLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < 20; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz,randomPoz+1);
        }

        session.sessionid = randomString

    });





});

SessionSchema.statics.getSession = function(sessionid, cb) {
    this.findOne({ sessionid: sessionid }, function(err, session) {
        if (err) return cb(err);

        // make sure the session exists
        if (session) {
        return(null,session)
        }
    });
};

UserSchema.methods.makeid = function (len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
//}





module.exports = mongoose.model('Session', SessionSchema);
