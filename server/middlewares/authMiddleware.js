const passport = require('passport');

const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log('JWT authentication error or no user:', err, info);
      return res.status(403).json({ message: 'Unauthorized' });
    }
    console.log('Authenticated user in middleware:', user); // Add this line for debugging
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateJWT;
