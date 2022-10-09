import { createSelector } from '@reduxjs/toolkit';

export const usersReducer = (state) => state.users.users;
export const usersFilterReducer = (state) => state.filters.users;
export const todosReducer = (state) => state.todos.todos;
export const searchTodo = (state) => state.filters.search;
export const projectsSelector = (state) => state.projects.projects;
export const projectSelector = (state) => state.projects.project;
export const projectIDSelector = (state) => state.projects.projectID;

export const todosRemaining = createSelector(
  usersFilterReducer,
  todosReducer,
  usersReducer,
  searchTodo,
  projectIDSelector,
  (usersFilter, todos, users, search, projectID) => {
    todos = todos.filter((todo) => todo.projectID === projectID);

    let userIds = [];

    if (usersFilter.length > 0) {
      userIds = usersFilter.map(
        (email) => users.find((user) => user.email === email).id
      );
    } else {
      userIds = users.map((user) => user.id);
    }

    const regex = new RegExp(`${search}`, 'i');

    // const todoRemaining = [];

    // for (let i = 0; i < todos.length; i++) {
    //   for (let j = 0; j < todos[i].assignees.length; i++) {
    //     if (userIds.includes(todos[i].assignees[j]))
    //       todoRemaining.push(todos[i]);
    //   }
    // }

    const todoRemaining = todos.filter(
      (todo) =>
        todo.assignees.some((user) => userIds.includes(user.id)) ||
        todo.reporters.some((user) => userIds.includes(user.id))
    );

    return todoRemaining;
  }
);
