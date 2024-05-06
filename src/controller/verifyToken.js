const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(403).json({ status: false, message: 'No token provided.' });
  }

  // Verify token
  jwt.verify(token.split(' ')[1], '123456', (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Failed to authenticate token.' });
    }
    // Store decoded token for later use in request handlers
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;
