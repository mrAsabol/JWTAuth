const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation} = require('../validation');
var CryptoJS = require("crypto-js");



router.post('/register', async (request,resource) =>{
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists!');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user_id });
    } catch (err) {
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //token
    var h = {
        alg: "HS256",
        typ: "JWT" 
    };

    var p = {
        _id: user._id,
        iat: Date.now()
    };

    function base64url(source) {
        encodedSource = CryptoJS.enc.Base64.stringify(source);
        
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');
        
        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        
        return encodedSource;
      }
      
      var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(h));
      var encodedHeader = base64url(stringifiedHeader);
      
      var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(p));
      var encodedData = base64url(stringifiedData);
      
      var signature = encodedHeader + "." + encodedData;
      signature = CryptoJS.HmacSHA256(signature, process.env.TOKEN_SECRET);
      signature = base64url(signature);
      var token = encodedHeader + "." + encodedData + "." + signature;

    
    //const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);

    res.send('You are logged in!');
});

module.exports = router;
