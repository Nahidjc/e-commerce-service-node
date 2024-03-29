const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../variables");
exports.signup = async (req, res) => {
  try {
    const { fullName, userName, password, rePassword, email } = req.body;
    if (!fullName || !userName || !password || !rePassword || !email) {
      return res.status(400).json({ message: "Invalid Creadentials." });
    }
    const userExits = await userModel.doesExists(email);
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
      password: hashPassword,
    });

    res.send({
      message: "User created Successfully",
      userId: userInfo._id,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Creadentials.", statusCode: 400 });
    }
    const user = await userModel.doesExists(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password Doesn't Match.", statusCode: 404 });
    }
    const accessToken = createAccessToken({
      id: user._id, fullName: user.fullName,
      email: user.email,
      userName: user.userName,
      role: user.role
    });
    const refreshToken = createRefreshToken({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
      role: user.role
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    const userDetails = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
      role: user.role
    }

    res.json({ accessToken, "message": "Login Successfully", user: userDetails, statusCode: 200 });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      statusCode: 500,
      message: "Invalid Creadentials.",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) {
      return res.status(400).json({ msg: "Please Login or Register." });
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });
    return res.json({ msg: "Logged Out" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}



const createAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
