const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
     const users = db.get('users').value();
     res.render('users/index', {
          users: users
     })
}

module.exports.create = (req, res) => {
     res.render('users/create')
}

module.exports.delete = (req, res) => {
     let id = req.params.id;
     db.get('users').remove({ id: id }).write();
     res.redirect('/users');
}

module.exports.portCreate = (req, res) => {
     req.body.id = shortid.generate();
     db.get('users').push(req.body).write();
     res.redirect('/users');
}