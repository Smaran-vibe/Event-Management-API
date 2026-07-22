const User = require("../models/user.model");

const createUser = async (userData) => {
    const user = await User.create(userData);

    return user;
};

const getAllUsers = async () => {
    const users = await User.find();

    return users;
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);

    return user;
};

const updateUser = async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        userData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    return updatedUser;
};

const deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);

    return deletedUser;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};