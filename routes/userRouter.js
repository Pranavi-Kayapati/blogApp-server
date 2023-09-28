const express = require("express");
const UserModel = require("../models/userModal");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
userRouter.post("/register", async (req, res) => {
  const { avatar, email, username, password } = req.body;
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      if (err) {
        res.send({ err: err });
      } else {
        const user = UserModel({ avatar, email, username, password: hash });
        await user.save();
        res.status(200).send({ msg: "User Registered", user: user });
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.username },
            "blogApp"
          );
          res.send({ message: "Login successful", token: token });
        } else {
          res.send({ error: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ message: "User not exist" });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = userRouter;
