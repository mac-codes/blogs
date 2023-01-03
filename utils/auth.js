const withAuth = (req, res, next) => {
  if(!req.sessions.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;