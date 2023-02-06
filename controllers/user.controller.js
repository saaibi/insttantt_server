const User = require("../models/user");

const userController = {};

userController.getAllUsers = async (req, res) => {
    const user = await User.find();
    res.json(user);
};

userController.getByIdUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

userController.getByIdUserAccount = async (req, res) => {
    const user = await User.findById(req.params.id).populate('accounts').exec();
    res.json(user);
};

userController.createUser = async (req, res) => {
    const { phoneNumber, firstName, lastName, documentType, documentNumber, birthdate, expeditionDate } = req.body;

    const user = new User({ phoneNumber, firstName, lastName, documentType, documentNumber, birthdate, expeditionDate });

    await user.save((err, user) => {
        if (err) return res.json({ error: err });
        res.json({ status: "User Saved", user });
    });

};

userController.login = async (req, res) => {
    const { username, password } = req.body;
    await User.findOne({ username, password }, (err, user) => {
        if (err) return res.json({ error: err });
        if (user)
            res.json({ status: "User Logged", user });
        else
            res.status(500).send('Email or password is incorrect!');
        //    throw res.json({ status: "Email or password is incorrect" });
    });

};

userController.updateUser = async (req, res) => {
    const { } = req.body;
    const userUpdate = {}

    await User.findByIdAndUpdate(req.params.id, userUpdate, { new: true }, (err, user) => {
        if (err) return res.json({ error: err });
        res.json({ status: "User Updated", user });
    });

};

userController.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id, (err, product) => {
            if (err) return res.json({ error: err });
            res.json({ status: "User Removed" });
        });
    } catch (error) {
        const message = error.message || error;
        res.json({ error: message });
    }
};

module.exports = userController;
