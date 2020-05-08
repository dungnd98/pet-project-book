const db = require('../db');

module.exports.postCreate = (req, res, next) => {
  var name = req.body.name;
  var errors = [];

  if(!req.body.name){
    errors.push('Chưa nhập tên bạn ơi !');
  }

  if(!req.body.sdt){
    errors.push('Chưa nhập sô điện thoại bạn ơi !');
  }

  if(!req.body.email){
    errors.push('Chưa nhập email bạn ơi !');
  }

  if(name.length > 30) {
    errors.push('Tên dài quá bạn ơi !');
  }

  if(errors.length){
    res.render('./users/create', {
      users: db.get('users').value(),
      errors: errors
    });
    return;
  }
  next();
};