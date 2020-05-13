const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
    let user = db.get('users').find({ id: req.signedCookies.userId }).value();
    let page = parseInt(req.query.page) || 1;
    let perPage = 5;
    let link = "transactions";
    let start = (page -1) * perPage;
    let end = page * perPage;
    let totalPage = Math.ceil(db.get('transactions').value().length / perPage );
    let transactions = db.get('transactions').value().slice(start, end);
    if(user.isAdmin === true) {
        res.render('transactions/index', {
            transactions: transactions,
            totalPage: totalPage,
            page: page,
            link: link,
            users: db.get("users").value(),
            books: db.get("books").value()
        })
    }
    else {
        let dataUser = db.get('transactions').filter({ userId: req.signedCookies.userId }).value();
        res.render('transactions/index', {
            transactions: transactions,
            user: db.get('users').find({ userId: dataUser.id }).value(),
            books: db.get('books').find({ bookId: dataUser.id }).value()
        })
    }
}

module.exports.create = (req, res) => {
    res.render('transactions/create', {
        users: db.get("users").value(),
        books: db.get("books").value()
    })
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    db.get("transactions")
        .push(req.body)
        .write();
    res.redirect("/transactions");
}

module.exports.complete = (req, res) => {
    let id = req.params.id;
    db.get('transactions')
        .find({ id: id})
        .assign({ isComplete: true })
        .write();
    res.redirect("/transactions");
  }