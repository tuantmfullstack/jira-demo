/**
 * ProjectsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Projects = require("../models/Projects.js");

module.exports = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Projects.find();
      res.status(200).json({
        status: "success",
        length: projects.length,
        data: {
          projects,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  createProject: async (req, res) => {
    try {
      const project = await Projects.create(req.body).fetch();
      res.status(200).json({
        status: "success",
        message: "Project created.",
        data: {
          project,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  deleteAllProjects: async (req, res) => {
    try {
      await Projects.destroy({});
      res.status(200).json({
        status: "success",
        message: "All projects deleted.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  getProject: async (req, res) => {
    try {
      const project = await Projects.findOne({ id: req.params.id }).populate(
        "subTasks"
      );

      if (!project) throw new Error("There is no project with this ID");

      res.status(200).json({
        status: "success",
        data: {
          project,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  updateProject: async (req, res) => {
    try {
      const project = await Projects.updateOne({ id: req.params.id }).set(
        req.body
      );
      res.status(200).json({
        status: "success",
        message: "Project updated.",
        data: {
          project,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const project = await Projects.destroyOne({ id: req.params.id }).fetch();
      res.status(200).json({
        status: "success",
        message: "Project deleted.",
        data: {
          project,
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
