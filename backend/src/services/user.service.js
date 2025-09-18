const User = require("../models/user.model");

/* CREATE */
exports.createUser = async (email, hashedPassword) => {
    const user = new User({
        email: email,
        password: hashedPassword,
    });

    await user.save();
    return user;
};

/* READ */
exports.getUserById = async id => {
    const user = await User.findById(id);
    return user;
};

exports.getUserByEmail = async email => {
    const user = await User.findOne({ email: email });
    return user;
};

/* UPDATE */
exports.updateUserById = async (id, email, hashedPassword) => {
    const user = await User.findById(id);

    if (email) user.email = email;
    if (hashedPassword) user.password = hashedPassword;

    await user.save();
    return user;
};

/* DELETE */
exports.deleteUserById = async id => {
    const user = await User.findByIdAndDelete(id);
    return user;
};