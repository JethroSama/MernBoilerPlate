const User = require('../models/User');
exports.secret = async (req, res) => {
  res.json({
    user: req.user,
  });
};
