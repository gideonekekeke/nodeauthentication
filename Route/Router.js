const user = require("../Model/ModelSchema");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { Register, Login } = require("../ValidationFile");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    //validating the user
    const { error } = await Register(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the email exists
    const EmailChecker = await user.findOne({ email: req.body.email });
    if (EmailChecker) {
      return res.status(401).json("email already exists");
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashPassword);
    //create the user
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(401).json("an error occured");
  }
});

router.post("/login", async (req, res) => {
  const { error } = await Login(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const EmailChecker = await user.findOne({ email: req.body.email });
  if (!EmailChecker) return res.status(401).json("email or password wrong");

  const validPass = await bcrypt.compare(
    req.body.password,
    EmailChecker.password
  );

  if (!validPass) return res.status(400).json("invalid password");

  //create a token for user

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("user-token", token).send(token);

  // res.json("Logged in");
});

module.exports = router;
