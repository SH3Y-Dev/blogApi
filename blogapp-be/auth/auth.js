const User = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser._id);

    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    if (err) return next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401).json("Please provide email and password");
      return next(new Error("Please provide email and password"));
    }

    const user = await User.findOne({ email });
    console.log(user)

    if (!user && !(await user.isValidPassword(password, user.password))) {
      return res.json("Incorrect email or password");
    }

     
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "Email or Password is Incorrect",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ status: "fail", message: "Unauthorized: No token provided" });
    }

    const decodedPayload = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decodedPayload.id);
    if (!currentUser) {
      return res.status(401).json({ status: "fail", message: "Unauthorized: User not found" });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ status: "fail", message: "Invalid or expired token" });
  }
};
