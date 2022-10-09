/**
 * AuthenticationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Users = require("../models/Users.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("./EmailController.js");

const responseToUser = (user, statusCode, res, message) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, avatar, password, passwordConfirm } = req.body;
      if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).json({
          status: "fail",
          message: "Please provide us data.",
        });
      }

      if (password !== passwordConfirm)
        throw new Error("Password and passwordConfirm must be equal.");

      const user = await Users.create({
        name,
        email,
        avatar,
        password,
        passwordConfirm,
      }).fetch();

      user.password = null;

      const message = "Account created.";
      responseToUser(user, 201, res, message);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new Error("Please provide us email and password.");

      const user = await Users.findOne({ email });
      if (!user) throw new Error("There is no user with this email.");

      if (!(await bcrypt.compare(password, user.password)))
        throw new Error("Wrong password.");

      const message = "Login successfully.";
      responseToUser(user, 200, res, message);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) throw new Error("Please provide us email.");

      const user = await Users.findOne({ email });
      if (!user) throw new Error("There is no user with this email");

      const randomString = crypto.randomBytes(32).toString("hex");
      const token = crypto
        .createHash("sha256")
        .update(randomString)
        .digest("hex");

      await Users.updateOne({ email }).set({
        passwordResetToken: token,
        passwordResetTokenExpire: Date.now() + 10 * 60 * 1000,
      });

      const URLClient = `http://localhost:6000/resetPassword/${randomString}`;

      const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to: ${URLClient}. If you didn't forget your password, please ignore this email.`;
      const subject = "PASSWORD RESET TOKEN (ONLY VALID ON 10 MINS)";

      await sendEmail({ to: email, subject, message });

      res.status(200).json({
        status: "success",
        message: "Password reset token has been sent to your email.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const hashToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await Users.findOne({
        passwordResetToken: hashToken,
        passwordResetTokenExpire: { ">": Date.now() },
      });

      // console.log(user.passwordResetTokenExpire, Date.now());

      if (!user) throw new Error("Invalid resetToken");

      const { password, passwordConfirm } = req.body;

      const newUser = await Users.updateOne({ id: user.id }).set({
        password,
        passwordConfirm,
        passwordChangedAt: Date.now(),
        passwordResetToken: null,
        passwordResetTokenExpire: 0,
      });

      newUser.password = null;
      newUser.passwordConfirm = null;

      responseToUser(newUser, 200, res);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { currentPassword, password, passwordConfirm } = req.body;
      if (!currentPassword || !password || !passwordConfirm)
        throw new Error("Please provide us data.");

      if (!(await bcrypt.compare(currentPassword, req.user.password)))
        throw new Error("Wrong password.");

      if (password !== passwordConfirm)
        throw new Error("Password and passwordConfirm must be equal.");

      const user = await Users.updateOne({ id: req.user.id }).set({
        password,
        passwordConfirm,
        passwordChangedAt: Date.now(),
      });

      user.password = null;
      user.passwordConfirm = null;
      responseToUser(user, 200, res);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  // confirmEmail: Similar to forgotPassword
};
