/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  // PROJECTS:
  "GET /projects": "ProjectsController.getAllProjects",
  "POST /projects": "ProjectsController.createProject",
  "DELETE /projects": "ProjectsController.deleteAllProjects",
  "GET /projects/:id": "ProjectsController.getProject",
  "PATCH /projects/:id": "ProjectsController.updateProject",
  "DELETE /projects/:id": "ProjectsController.deleteProject",

  // TASKS:
  "GET /tasks": "TasksController.getAllTasks",
  "POST /tasks": "TasksController.createTask",
  "DELETE /tasks": "TasksController.deleteAllTasks",
  "GET /tasks/:id": "TasksController.getTask",
  "PATCH /tasks/:id": "TasksController.updateTask",
  "DELETE /tasks/:id": "TasksController.deleteTask",

  // USERS:
  "GET /users": "UsersController.getAllUser",
  "POST /users": "UsersController.createUser",
  "DELETE /users": "UsersController.deleteAllUsers",
  "GET /users/:id": "UsersController.getUser",
  "PATCH /users/:id": "UsersController.updateUser",
  "DELETE /users/:id": "UsersController.deleteUser",

  // AUTHENTICATION:
  "POST /signup": "AuthController.signup",
  "POST /login": "AuthController.login",
  "POST /forgotPassword": "AuthController.forgotPassword",
  "PATCH /resetPassword/:token": "AuthController.resetPassword",
  "PATCH /updatePassword": "AuthController.updatePassword",
  // "PATCH /confirmEmail/:token": "AuthController.confirmEmail",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
