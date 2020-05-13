const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title: String,
    description: String,
    email: String,
    password: String,
    wrongLoginCount: String,
    isAdmin: Boolean,
    avatarUrl: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
