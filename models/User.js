const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    tokens: [{
        token : {
            type: String,
            required: true
        }
    }]

})

userSchema.virtual('forms', {
    ref: 'Form',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async function (name, password) {
    const user = await User.findOne({ name: name });
    if (!user){
        const error = new Error('User not found');
        return res.status(404).send(error);
    }


    const isMatch = await bcrypt.compare( password, user.password );
    if (isMatch){
        return user
    } else {
        const error = new Error('Wrong password!');
        return res.status(401).send(error);
    }

}

userSchema.pre('save', async function (next) {
    const user = this;
    //very impt
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;