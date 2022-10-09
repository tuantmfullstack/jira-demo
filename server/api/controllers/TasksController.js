/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Projects = require("../models/Projects.js");
// const Tasks = require("../models/Tasks.js");

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Tasks.find()
        .populate("assignees", {
          select: ["name", "email", "avatar"],
        })
        .populate("reporters", {
          select: ["name", "email", "avatar"],
        });

      res.status(200).json({
        status: "success",
        length: tasks.length,
        data: {
          tasks,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  getTask: async (req, res) => {
    try {
      const task = await Tasks.findOne({ id: req.params.id })
        .populate("assignees", {
          select: ["name", "email", "avatar"],
        })
        .populate("reporters", {
          select: ["name", "email", "avatar"],
        });

      if (!task) throw new Error("There is no task with this ID");

      res.status(200).json({
        status: "success",
        data: {
          task,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  createTask: async (req, res) => {
    try {
      const newTask = await Tasks.create(req.body).fetch();

      const task = await Tasks.findOne({ id: newTask.id })
        .populate("assignees", {
          select: ["name", "email", "avatar"],
        })
        .populate("reporters", {
          select: ["name", "email", "avatar"],
        });

      res.status(200).json({
        status: "success",
        message: "Task created.",
        data: {
          task,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  updateTask: async (req, res) => {
    try {
      const updatedTask = { ...req.body };

      if (updatedTask.assignees.length) {
        await Tasks.replaceCollection(
          req.params.id,
          "assignees",
          updatedTask.assignees
        );
      }

      if (updatedTask.reporters.length) {
        await Tasks.replaceCollection(
          req.params.id,
          "reporters",
          updatedTask.reporters
        );
      }

      delete updatedTask.assignees;
      delete updatedTask.reporters;

      await Tasks.updateOne({ id: req.params.id }).set(updatedTask);

      const task = await Tasks.findOne({ id: req.params.id })
        .populate("assignees", {
          select: ["name", "email", "avatar"],
        })
        .populate("reporters", {
          select: ["name", "email", "avatar"],
        });

      if (!task) throw new Error("There is no task with this ID");

      res.status(200).json({
        status: "success",
        message: "Task updated.",
        data: {
          task,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const task = await Tasks.destroyOne({ id: req.params.id });

      if (!task) throw new Error("There is no task with this ID");

      res.status(200).json({
        status: "success",
        message: "Task deleted.",
        data: {
          task,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
  deleteAllTasks: async (req, res) => {
    try {
      await Tasks.destroy({});
      res.status(200).json({
        status: "success",
        message: "All tasks deleted.",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  },
};
