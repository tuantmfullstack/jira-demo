/**
 * Tasks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    issueType: {
      type: "string",
      required: true,
      isIn: ["TASK", "STORY", "BUG"],
    },
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
      isIn: ["backlog", "select-for-development", "in-progress", "done"],
    },
    assignees: {
      collection: "users",
      via: "assignedTasks",
    },
    reporters: {
      collection: "users",
      via: "reportedTasks",
    },
    priority: {
      type: "string",
      isIn: ["lowest", "low", "medium", "high", "highest"],
      required: true,
    },
    estimateTime: {
      type: "number",
    },
    projectID: {
      model: "projects",
      required: true,
    },
  },
};
