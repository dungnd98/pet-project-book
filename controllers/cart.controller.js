const db = require('../db');

module.exports.addToCart = (req, res) => {
    let bookId = req.params.bookId;
    let sessionId = req.signedCookies.sessionId;
    if(!sessionId) {
        res.redirect('/books');
        return;
    }

    let count = db.get('sessions')
        .find({ id: sessionId })
        .get('cart.' + bookId, 0)
        .value();

    db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + bookId, count + 1)
    .write();

    res.redirect('/books')
}