const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
     res.render('index');
})

app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}`))