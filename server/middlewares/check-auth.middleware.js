const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_KEY);
    console.log(JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};
