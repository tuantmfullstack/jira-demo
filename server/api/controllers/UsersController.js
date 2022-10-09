/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Users = require("../models/Users.js");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json({
        status: "success",
        length: users.length,
        data: {
          users,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  createUser: async (req, res) => {
    res.status(500).json({
      status: "error",
      message: "Please use /signup to create user",
    });
  },
  deleteAllUsers: async (req, res) => {
    try {
      await Users.destroy({});
      res.status(200).json({
        status: "success",
        message: "All users deleted.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findOne({ id: req.params.id });

      if (!user) throw new Error("There is no user with this ID.");

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    res.status(400).json({
      status: "fail",
      message: "Please use /updateMe to update data",
    });
  },
  deleteUser: async (req, res) => {
    try {
      const user = await Users.destroyOne({ id: req.params.id });

      if (!user) throw new Error("There is no user with this ID.");

      res.status(200).json({
        status: "success",
        message: "User deleted.",
        data: {
          user,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
