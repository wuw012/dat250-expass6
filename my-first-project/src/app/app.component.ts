import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'todo-table',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todo-table';
  headers = ["ID", "Description", "Summary", "Action"]
  allTodos: Todo[] = [];
  description = "";
  summary = "";

  constructor(private http: HttpClient, private todoService: TodoService){

  }
  ngOnInit() {
    this.getTodos();
  }

  refresh(){
    this.getTodos();
  }

  private getTodos(){
    this.todoService.getTodos().subscribe((todos)=> {
      this.allTodos = todos;
      console.log(this.allTodos)
    })
  }
  
  createTodo(summary: string, description: string) {
    this.todoService.createTodo(summary, description);
  }

  deleteTodo( id : any ) {
    this.todoService.deleteTodo(id);
    alert("Click the refresh button");
  }
}

