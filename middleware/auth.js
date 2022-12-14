const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../variables");

const Auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "Invalid Athentication." });
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid Athentication." });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = Auth;