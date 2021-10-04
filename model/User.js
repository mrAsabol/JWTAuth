const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true, //setting username as required
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true, //Setting email as required
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    backupEmail: {
        type: String,
        required: false, //Setting backup email as required
        min: 6,
        max: 255
    },
});

module.exports = mongoose.model('User', userSchema);
