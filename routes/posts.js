const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
    res.send(req.user);
    User.findByOne({_id: user._id});
});

module.exports = router;