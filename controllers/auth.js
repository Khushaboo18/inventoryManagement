const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  createJWT,
} = require("../utils/auth");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const MAX_ATTEMPTS = 3; //Number of failed attempts
const LOCK_TIME = 15 * 60 * 1000; //Locking the user for 15mins

//Registering a user
exports.signup = (req, res) => {
  let { name, email, password, password_confirmation } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Salting and hashing password before saving to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
}

//Signing a user
exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ passowrd: "required" });
  }
  if (errors.length > 0) {
    return res.status(401).json({ errors: errors });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).send({ errors: "Username/Password is incorrect" });
    }

    //Comparing the user password with hstored ashed password
    else {
      bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
          if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(401).send({ errors: "Account is temporarily locked.Try again later" });
          }

          //If previous account lock has expired then reset the login attempt at 1
          if (user.lockUntil < Date.now()) {
            User.findOne({ email: user.email }, function (err, user) {
              if (err) return res.status(500).send({ error: err });
              user.loginAttempts = 1;
              user.lockUntil = undefined;
              user.save();
            });
          }

          // Incrementing the login attempt
          User.findOneAndUpdate({ email: user.email }, { $inc: { loginAttempts: 1 } }, function (err) {
            if (err) return res.status(500).send({ error: err });
          });

          //Locking the account if max attempts is reached and account is not already locked
          if (user.loginAttempts + 1 >= MAX_ATTEMPTS && !user.lockUntil) {
            User.findOneAndUpdate({ email: user.email }, { lockUntil: Date.now() + LOCK_TIME }, function (err, user) {
              if (err) return res.status(500).send({ error: err });
            });
            return res.status(401).send({ errors: "Account is temporarily locked.Try again later" });
          }
          else {
            res.status(401).json({ errors: "Username/Password is incorrect" });
          }
        }

        //Continue with user login if user password matched
        if (result) {
          if (user.lockUntil > Date.now()) {
            return res.status(401).send({ errors: "Account is temporarily locked.Try again later" });
          }
          else {
            User.findOne({ email: user.email }, function (err, user) {
              if (err) return res.status(500).send({ error: err });
              user.loginAttempts = 0;
              user.lockUntil = undefined;
              user.save();
            });
            let access_token = createJWT(
              user.email,
              user._id,
              3600
            );
            jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
              if (err) {
                res.status(500).json({ errors: err });
              }
              if (decoded) {
                return res.status(200).json({
                  success: true,
                  token: access_token,
                  message: user
                });
              }
            });
          }
        }
      });
    }
  }).catch(err => {
    res.status(500).json({ erros: err });
  });
}