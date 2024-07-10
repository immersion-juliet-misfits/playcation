const isAuthenticated = (req, res, next) => { // check user authentication
//  if user, go to next, else redirect
  !req.user ? res.redirect('/') : next();
};

module.exports = isAuthenticated;
