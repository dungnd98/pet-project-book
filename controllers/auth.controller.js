const db = require('../db');
//const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login');
}

module.exports.portLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get('users').find({ email: email }).value();

    if(!user) {
        res.render('auth/login', {
            errors: [
                'Khong ton tai user'
            ],
            values: req.body
        })
        return;
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(!result) {
            let count = user.wrongLoginCount;
            count++;
            db.get('users').find({ email: email }).assign({ wrongLoginCount: count }).write();
            res.render('auth/login', {
                errors: [
                    'Sai mat khau'
                ],
                values: req.body
            })
            return;
        }
        else {
            res.cookie('userId', user.id, {
                signed: true
            });
            res.redirect('/users');
        }
    });
}