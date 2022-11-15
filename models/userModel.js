const UserModel  = require("../schema/userSchema");

exports.create = data => {
    const user = new UserModel(data);
    return user.save();
  };
  
  exports.doesExists = async email => {
    const userExists = await UserModel.findOne({ email });
    return userExists;
  };
  
  exports.isValid = async (email, password) =>
    UserModel.findOne({ email, password });
  
  exports.doesExistsId = async id => {
    const userExists = await UserModel.findById(id);
    if (userExists) return true;
    return false;
  };