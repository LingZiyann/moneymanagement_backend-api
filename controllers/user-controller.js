const User = require('../models/User');
const HttpError = require('../models/httpError');

const signup = async (req, res) => {
    const { name, password } = req.body;
    const user = new User(req.body);
    let existingUser;;
    try {
      existingUser = await User.findOne({ name: name })
    } catch (err) {
        res.send(err);
        console.log(err);
    };
    if (existingUser) {
        const error = new Error('user exists');
        return res.status(403).send(error);
    };
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })
    } catch (err) {
        res.send(err);
        console.log(err);
    };
};

const login = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.name, req.body.password);
        const token = user.generateAuthToken();
        res.send({user, token});
    } catch (e){
        res.send("Unable to login!");
        console.log(e);
    };
};

exports.signup = signup;
exports.login = login;