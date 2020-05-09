require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const bookRoute = require('./routes/book.route');
const cartRoute = require('./routes/cart.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
     let books = db.get("book")
     res.render('index');
})

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/books', bookRoute);
app.use('/cart', cartRoute);

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}`))