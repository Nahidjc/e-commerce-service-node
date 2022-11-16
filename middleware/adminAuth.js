const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentication" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentication" });
      }
      req.user = user;
      const admin = await User.findUserById(user.id);
   
      if (admin.role !== "admin" ) {
        return res.status(400).json({ msg: "Admin Recources Access Denied." });
      
      }
      next();

    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;