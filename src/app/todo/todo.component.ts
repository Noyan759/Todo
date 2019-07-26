import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  // providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

  async getTodos(query = '') {
    const todos = await this.todoService.get(query);
    console.log(todos);
    this.todos = todos;
    this.activeTasks = this.todos.filter(todo => todo.isDone).length;
  }

  async addTodo() {
    await this.todoService.add({ title: this.newTodo, isDone: false });
    await this.getTodos();
    this.newTodo = ''; // clear input form value
  }

  async updateTodo(todo, newValue) {
    todo.title = newValue;
    await this.todoService.put(todo);
    todo.editing = false;
    return this.getTodos();
  }

  async destroyTodo(todo) {
    await this.todoService.delete(todo);
    return this.getTodos();
  }

  async clearCompleted() {
    await this.todoService.deleteCompleted();
    return this.getTodos();
  }

  async toggleTodo(toggleTodo) {
    toggleTodo.isDone = !toggleTodo.isDone;
    await this.todoService.toggleTodo(toggleTodo);
    return this.getTodos();
  }
}