const Form = require('../models/form');
const HttpError = require('../models/httpError');
const User = require('../models/User');


const createForm = async (req, res) => {
    const form = new Form({
        ...req.body,
        owner: req.user._id
    })

    try {
        await form.save();
        res.status(201).send(form);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    };
};

const deleteForm = async (req, res) => {
    try{
        const form = await Form.findOneAndDelete({ _id: req.params.id})
        
        if (!form) {
            res.status(404).send("failed");
        }
        res.send(form);

    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    };
};

// const getFormByUserId = async (req, res) => {
//     try{
//         const forms = await Form.find({ owner: req.params.id })
//     } catch (e) {
//         res.status(500).send(e);
//         console.log(e);
//     }
// }

const getFormByCategory = async (req, res) => {
    const category = await req.params.category;
    const uid = await req.params.uid;
    const user = await User.findOne({ _id: uid})
    try{
        await user.populate({
            path: 'forms',
            match: {
                category : category,
            }
        });
        res.send(user.forms);
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}

const getAllForm = async (req, res) => {
    const uid = await req.params.uid;
    const user = await User.findOne({ _id: uid})
    try{
        await user.populate({
            path: 'forms',
        });
        res.send(user.forms);
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}

exports.createForm = createForm;
exports.deleteForm = deleteForm;
exports.getFormByCategory = getFormByCategory;
exports.getAllForm = getAllForm;