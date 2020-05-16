
const User = require('../models/user.model');
module.exports.requireAuth = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('auth/login');
    return;
  }
  const user = await User.findOne({ _id: req.signedCookies.userId });
  if(!user) {
    res.redirect('auth/login');
  }
  
  res.locals.user = user;

  next();
}