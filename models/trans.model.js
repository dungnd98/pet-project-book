const mongoose = require('mongoose');

const transSchema = new mongoose.Schema({
    userId: String,
    bookId: String,
    isComplete: Boolean
});

const Trans = mongoose.model('Trans', transSchema, 'transactions');

module.exports = Trans;