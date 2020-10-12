const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { validateSignup, validateSignin } = require('../validation');
exports.signup = async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error)
    return res.json({
      error: error.message,
    });
  //check if email exist in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.json({
      error: 'Email already exists',
    });
  }

  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err)
      return res.json({
        error: 'Database Error',
      });
    res.status(200).json({
      message: 'User created',
      user: { ...user._doc, hashedPassword: undefined },
    });
  });
};
exports.signin = async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error)
    return res.json({
      error: error.message,
    });
  //check if email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) {
    return res.json({
      error: 'Email does not have an account',
    });
  }
  const validPass = emailExist.validPassword(req.body.password);
  if (!validPass)
    return res.status(203).json({
      error: 'Invalid Password',
    });
  const { _id, username } = emailExist;
  const token = jwt.sign({ _id: _id, username: username }, 'supersecretkey');
  res.cookie('token', token, {
    expire: new Date() + 99999,
  });
  return res.json({
    token,
    user: { ...emailExist._doc, hashedPassword: undefined },
  });
};
exports.signout = async (req, res) => {
  res.clearCookie().json({
    message: 'signed out',
  });
};

exports.requireSignIn = expressJwt({
  userProperty: 'user',
  secret: 'supersecretkey',
  algorithms: ['HS256'],
});
