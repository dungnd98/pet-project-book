
const User = require('../models/user.model');
const Trans = require('../models/trans.model');
const Book = require('../models/book.model');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
     cloud_name: process.env.CLOUND_NAME, 
     api_key: process.env.API_KEY, 
     api_secret: process.env.API_SECRET 
});

module.exports.index = async (req, res) => {
     const page = parseInt(req.query.page) || 1;
     const perPage = 5;
     const start = (page - 1) * perPage;
     const link = "users";
     const user = await User.findById({ _id: req.signedCookies.userId });
     const totalPage = await User.estimatedDocumentCount();
     const userList = await User.find(null, null, { skip: start }).limit(perPage);    
     if(user.isAdmin) {
          res.render('users/index', {
               users: userList,
               link: link,
               totalPage: totalPage,
               page: page
          })
     }
     else {
          res.redirect('/transactions')
     }

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

module.exports.delete = async (req, res) => {
     let id = req.params.id;
     await User.remove({ _id: id });
     res.redirect('/users');
}


module.exports.portCreate = async (req, res) => {

     req.body.password = bcrypt.hashSync('123123', 10);
     req.body.wrongLoginCount = 0;
     req.body.isAdmin = false;
     req.body.avatarUrl = "https://res.cloudinary.com/dungquat/image/upload/v1588928202/avatar_bua5cm.png";
     const user = new User(req.body);
     await user.save();
     res.redirect('/users');
}

module.exports.portAvatar = async (req, res) => {
     const id = req.body.id;
     const file = await cloudinary.uploader.upload(req.file.path);
     await User.updateOne({ _id: id}, {$set: {avatarUrl: file.url} });
     //db.get('users').find({ id: id }).assign({ avatarUrl: file.url }).write();
     res.redirect('/users/profile');
}