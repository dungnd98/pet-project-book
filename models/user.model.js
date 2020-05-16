const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    sdt: String,
    email: String,
    password: String,
    wrongLoginCount: Number,
    isAdmin: Boolean,
    avatarUrl: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
