"use strict";
const mongoose_1 = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
(function (Roles) {
    Roles[Roles["member"] = 0] = "member";
    Roles[Roles["admin"] = 1] = "admin";
})(exports.Roles || (exports.Roles = {}));
var Roles = exports.Roles;
let schema = mongoose_1.Schema({
    spark_email: String,
    spark_id: String,
    auth_spark: { type: Object },
    name: String,
    password: String,
    role: {
        type: String, enum: [
            Roles[Roles.member],
            Roles[Roles.admin]
        ], default: 'member'
    },
});
schema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
schema.method('comparePassword', function (candidatePassword) {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, function (err, isMatch) {
            if (err)
                return reject(err);
            resolve(isMatch);
        });
    });
});
exports.User = mongoose_1.model('User', schema);
//# sourceMappingURL=users.js.map