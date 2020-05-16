const db = require('../db');
const Trans = require('../models/trans.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');
const shortid = require('shortid');

module.exports.index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const start = (page - 1) * perPage;
    const link = "transactions";
    const user = await User.findById({ _id: req.signedCookies.userId });
    const totalPage = await Trans.estimatedDocumentCount();
    const transList = await Trans.find(null, null, { skip: start }).limit(perPage);  
    if(user.isAdmin) {
        res.render('transactions/index', {
            transactions: transList,
            totalPage: totalPage,
            link: link,
            page: page,
            users: await User.find(),
            books: await Book.find()
        })
    }
    else {
        const data = await Trans.find({ userId: req.signedCookies.userId });
        res.render('transactions/index', {
               transactions: data,
               users: await User.find(),
               books: await Book.find()
        })
    }
}

module.exports.create = async (req, res) => {
    res.render('transactions/create', {
        users: await User.find(),
        books: await Book.find()
    })
}

module.exports.postCreate = async (req, res) => {
    req.body.isComplete = false;
    const trans = new Trans(req.body);
    trans.save();
    res.redirect("/transactions");
}

module.exports.complete = async (req, res) => {
    let id = req.params.id;
    await Trans.updateOne({ _id: id}, {$set: {isComplete: true}});
    res.redirect("/transactions");
  }