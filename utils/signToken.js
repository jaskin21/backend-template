const jwt = require('jsonwebtoken');

const signToken = (id, username, email, role) => {
  // You can add any payload, but `sub`, `iat` are the usual standard
  return jwt.sign(
    { id, username, email, role, sub: id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    }
  );
};

module.exports = { signToken };
