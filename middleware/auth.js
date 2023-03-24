const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = User.findOne({ _id : decode._id, 'tokens.token': token  })
        if (!user){
            const error = new Error('Cant find user');
            return res.status(404).send(error);
        }
        req.user = await user;
        req.token = await token;
        next();
    } catch (e) {
        res.send(e)
        console.log(e)
    }
};

module.exports = auth;