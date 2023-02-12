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

userController.createUser = async (req, res) => {
    const { email, phoneNumber, firstName, lastName, documentType, documentNumber, birthdate, expeditionDate } = req.body;

    const user = new User({ email, phoneNumber, firstName, lastName, documentType, documentNumber, birthdate, expeditionDate });

    await user.save((err, user) => {
        if (err) return res.json({ error: err });
        res.json({ status: "User Saved", user });
    });

};

userController.login = async (req, res) => {
    const { email, phoneNumber } = req.body;
    const query = User.findOne({ email, phoneNumber }, (err, user) => {
        if (err) return res.json({ error: err });
        if (user)
            res.json({ status: "User Logged", user });
        else
            res.status(500).send('Email or password is incorrect!');
    });

    await query.clone()
};

userController.updateUser = async (req, res) => {
    const userUpdate = req.body;
    const query = User.findByIdAndUpdate(req.params.id, userUpdate, { new: true }, (err, user) => {
        if (err) return res.json({ error: err });
        res.json({ status: "User Updated", user });
    });
    await query.clone()
};


userController.hobbie = async (req, res) => {
    const { hobbie } = req.body;
    const { hobbies } = await User.findById(req.params.id);
    hobbies.push(hobbie)
    const query = User.findByIdAndUpdate(req.params.id, { hobbies }, { new: true, multi: true }, (err, user) => {
        if (err) return res.json({ error: err });
        res.json({ status: "Add Hobbie", hobbies: user.hobbies });
    });
    await query.clone()
};

module.exports = userController;
