const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../config/keys");
const User = require("../models/user.model");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          messageType: "alert-success",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: err.message,
          //message: "Invalid authentication credentials!",
          messageType: "alert-danger"
        });
      });
  });
};

exports.userLogin = async(req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "Auth failed",
        messageType: "alert-danger"
      });
    }
    let fetchedUser = user;

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({
        message: "Auth failed",
        messageType: "alert-danger"
      });
    }

    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
      //process.env.JWT_KEY,
      //'secret', 
      JWT_KEY,
      { expiresIn: "1h" }
    );
    console.log(JWT_KEY);
    return res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      message: "Logged in successfully!",
      messageType: "alert-success"
    });
  }
  catch (err) {
    return res.status(401).json({
      message: "Invalid authentication credentials!",
      messageType: "alert-danger"
    });
  }
};

exports.changePassword = async(req, res) => {
  try {
    const condition = {_id: req.userData.userId};
    const userData = {password: await bcrypt.hash(req.body.password, 10)}; 
    console.log(req.userData.userId, req.body.password);
    await User.findOneAndUpdate(condition, userData);
    //console.log('Done!');
    /*console.log(data);
    if (!data) {
      return res.status(500).json({
        message: "No such user was found.",
        messageType: "alert-danger"
      });      
    }*/
    return res.status(200).json({
      message: "Password changed successfully!",
      messageType: 'alert-success'
    });
  }
  catch (err) { 
    return res.status(500).json({
      message: "unknown err",
      messageType: "alert-danger"
    });
  }
};

// hash the password
// find the user by ID and save the new password
// login after you are done with changing the password