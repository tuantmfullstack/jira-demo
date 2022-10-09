/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require("bcryptjs");

const updatePassword = async (user, next) => {
  user.password = await bcrypt.hash(user.password, 12);
  user.passwordConfirm = null;
  return next();
};

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    avatar: {
      type: "string",
      allowNull: true,
    },
    email: {
      type: "string",
      isEmail: true,
      required: true,
      unique: true,
    },
    isConfirm: {
      type: "boolean",
      defaultsTo: false,
    },
    confirmToken: {
      type: "string",
      allowNull: true,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 12,
      required: true,
    },
    passwordConfirm: {
      type: "string",
      required: true,
    },
    passwordChangedAt: {
      type: "number",
    },
    passwordResetToken: {
      type: "string",
      allowNull: true,
    },
    passwordResetTokenExpire: {
      type: "number",
    },
    assignedTasks: {
      collection: "tasks",
      via: "assignees",
    },
    reportedTasks: {
      collection: "tasks",
      via: "reporters",
    },
  },
  beforeCreate: async (user, next) => {
    updatePassword(user, next);
  },
  beforeUpdate: async (user, next) => {
    if (user.password && user.passwordConfirm) {
      updatePassword(user, next);
    }
    next();
  },
};
