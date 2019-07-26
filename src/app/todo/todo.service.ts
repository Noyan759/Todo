import { Injectable } from '@angular/core';

let TODOS = [
  { title: 'Install Angular CLI', isDone: true },
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  async get(query = '') {
    if (query === 'completed' || query === 'active') {
      const isCompleted = query === 'completed';
      return TODOS.filter(todo => todo.isDone === isCompleted);
    }
    return TODOS;
  }

  async add(data) {
    return TODOS.push(data);
  }

  async put(changed) {
    const index = TODOS.findIndex(todo => todo === changed);
    TODOS[index].title = changed.title;
    return changed;
  }

  async delete(selected) {
    const index = TODOS.findIndex(todo => todo === selected);
    TODOS.splice(index, 1);
  }

  async deleteCompleted() {
    TODOS = TODOS.filter(todo => !todo.isDone);
  }


  async toggleTodo(toggleTodo) {
    const index = TODOS.findIndex(todo => todo === toggleTodo);
    TODOS[index].isDone = toggleTodo.isDone;
    return toggleTodo;
  }
}