const shortid = require('shortid');
const db = require('../db');
const Book = require('../models/book.model');

module.exports = async (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        const sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    const books = await Book.find();

    let dataCart = db.get('sessions').find({ id: req.signedCookies.sessionId }).get('cart').value();
    let count = dataCart ? Object.values(dataCart).reduce((sum, item) => sum + item, 0) : 0;
    res.locals.countCart = count;
    res.locals.books = books;
    
    next();
}