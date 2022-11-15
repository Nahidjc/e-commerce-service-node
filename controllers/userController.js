const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
exports.signup = async (req, res) => {
  try {
    const { fullName, userName, password, rePassword, email } = req.body;

    console.log(fullName, userName, password, rePassword, email );
    if (!fullName || !userName || !password || !rePassword || !email) {
      return res.status(400).json({ message: "Invalid Creadentials." });
    }
    const userExits = await userModel.doesExists(email)
    if (userExits) {
        return res.status(400).json({ message: "User Already Exists." });
    }
    if (password !== rePassword) {
        return res.status(400).json({ message: "Password Doesn't Match." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    
    const userInfo = await userModel.create({
        fullName,
        email,
        userName,
        password:hashPassword
      });
  
      res.send({
        message: "User created Successfully",
        userId: userInfo._id
      });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }
};
