
const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.login = (req, res) => {
    res.render('auth/login');
}

module.exports.portLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    const user = await User.findOne({ email: email });

    if(!user) {
        res.render('auth/login', {
            errors: [
                'Khong ton tai user'
            ],
            values: req.body
        })
        return;
    }

    bcrypt.compare(password, user.password, async function(err, result) {
        if(!result) {
            let count = user.wrongLoginCount;
            count++;
            await User.updateOne({ email: email }, { $set: { wrongLoginCount: count } });
            res.render('auth/login', {
                errors: [
                    'Sai mat khau'
                ],
                values: req.body
            })
            return;
        }
        else {
            res.cookie('userId', user._id, {
                signed: true
            });
            res.redirect('/users');
        }
    });
}