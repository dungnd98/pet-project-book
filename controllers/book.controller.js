
const Book = require('../models/book.model');
const User = require('../models/user.model');
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
      const link = "books";
      const totalPage = await Book.estimatedDocumentCount();
      const user = await User.findById({ _id: req.signedCookies.userId });
      const bookList = await Book.find(null, null, { skip: start }).limit(perPage);  
      const books = await Book.find();
      res.render('books/index', {
            books: bookList,
            totalPage: totalPage,
            link: link,
            page: page,
            user: user
      })
}

module.exports.create = (req, res) => {
      res.render('books/create');
}

module.exports.delete = async (req, res) => {
      let id = req.params.id;
      await Book.remove({ _id: id});
      res.redirect('/books');
}

module.exports.postCreate = async (req, res) => {
      const file = await cloudinary.uploader.upload(req.file.path);
      req.body.coverUrl = file.url;
      const book = new Book(req.body);
      await book.save();
      res.redirect('/books');
}