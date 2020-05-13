const db = require('../db');
//const Book = require('../models/book.model');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
     cloud_name: process.env.CLOUND_NAME, 
     api_key: process.env.API_KEY, 
     api_secret: process.env.API_SECRET 
});

module.exports.index = async (req, res) => {
      let page = parseInt(req.query.page) || 1;
      let perPage = 5;
      let link = "books";
      let start = (page -1) * perPage;
      let end = page * perPage;
      let books = db.get('books').value().slice(start, end);
      let user = db.get('users').find({ id: req.signedCookies.userId }).value();
      let totalPage = Math.ceil(db.get('users').value().length / perPage );
      res.render('books/index', {
            books: books,
            page:page,
            totalPage: totalPage,
            link: link,
            user: user
      });
      // const books = await Book.find();
      // res.render('books/index', {
      //       books: books
      // })
}

module.exports.create = (req, res) => {
      res.render('books/create');
}

module.exports.delete = (req, res) => {
      let id = req.params.id;
      db.get('books').remove({ id: id }).write();
      res.redirect('/books');
}

module.exports.postCreate = async (req, res) => {
      req.body.id = shortid.generate();
      const file = await cloudinary.uploader.upload(req.file.path)
      req.body.coverUrl = file.url;
      db.get('books').push(req.body).write();
      res.redirect('/books');
}