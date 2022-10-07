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
        default: Date.now  //Setting date now
    },
    oneTimeCode: {
        type: String,
        required: true,
        min: 5,
        max: 5
    },
});

module.exports = mongoose.model('User', userSchema);
