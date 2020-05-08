require('dotenv').config();
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser(process.env.SESSION_SECRET));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
     res.render('index');
})

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}`))