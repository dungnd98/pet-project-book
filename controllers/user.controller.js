const db = require('../db');
const User = require('../models/user.model');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
     cloud_name: process.env.CLOUND_NAME, 
     api_key: process.env.API_KEY, 
     api_secret: process.env.API_SECRET 
});

module.exports.index = (req, res) => {
     let page = parseInt(req.query.page) || 1;
     let user = db.get('users').find({ id: req.signedCookies.userId }).value();
     //let user = User.findById({ _id: req.signedCookies.userId });
     let perPage = 5;
     let link = "users";
     let start = (page -1) * perPage;
     let end = page * perPage;
     let totalPage = Math.ceil(db.get('users').value().length / perPage );
     //let totalPage = Math.ceil(User.find());
     let userList = db.get('users').value().slice(start, end);
     if(user.isAdmin === true) {
          res.render('users/index', {
               users: userList,
               totalPage: totalPage,
               page: page,
               link: link
          })
     }
     // else {
     //      res.render('transactions/index', {
     //           users: user,
     //      })
     // }
}

module.exports.create = (req, res) => {
     res.render('users/create')
}

module.exports.profile = (req, res) => {
     res.render('users/profile')
}

module.exports.updateAvatar = (req, res) => {
     res.render('users/avatar')
}

module.exports.delete = (req, res) => {
     let id = req.params.id;
     db.get('users').remove({ id: id }).write();
     res.redirect('/users');
}


module.exports.portCreate = (req, res) => {
     req.body.id = shortid.generate();
     req.body.password = bcrypt.hashSync('123123', 10);
     req.body.wrongLoginCount = 0;
     req.body.isAdmin = false;
     req.body.avatarUrl = "https://res.cloudinary.com/dungquat/image/upload/v1588928202/avatar_bua5cm.png";
     db.get('users').push(req.body).write();
     res.redirect('/users');
}

module.exports.portAvatar = async (req, res) => {
     const id = req.body.id;
     const file = await cloudinary.uploader.upload(req.file.path)
     db.get('users').find({ id: id }).assign({ avatarUrl: file.url }).write();
     res.redirect('/users/profile');
}