const shortid = require('shortid');
const db = require('../db');

module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId) {
        const sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed: true
        });
        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    let dataCart = db.get('sessions').find({ id: req.signedCookies.sessionId }).get('cart').value();
    // if(dataCart){
    //     res.locals.countCart = Object.values(dataCart).reduce((sum, item) => sum + item, 0);
    // }
    let count = dataCart ? Object.values(dataCart).reduce((sum, item) => sum + item, 0) : 0;
    res.locals.countCart = count;
    
    next();
}