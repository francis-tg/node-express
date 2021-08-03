module.exports = function isLoggedOut(req, res,next){
    if(!req.isAuthenticated()) return next()
    res.redirect('/home/')
}

module.exports = function isLoggedIn(req, res,next){
    if(req.isAuthenticated()) return next()
    res.redirect('/user/login')
}
