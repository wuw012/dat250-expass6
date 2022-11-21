import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({providedIn: "root"})
export class TodoService {
    private url = 'http://localhost:8000/todos';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE" })
    };

    getTodos(){
        return this.http.get<Todo[]>(this.url, this.httpOptions).pipe(tap((res) => console.log(res)))
    }

    createTodo(description: string, summary: string){
        summary = summary.trim();
        description = description.trim();
        if (!summary || !description) { return; }
        const todo = { "summary": summary, "description": description };
        return this.http.post<Todo>(this.url, todo, this.httpOptions).subscribe((res) => console.log(res))
    }

    deleteTodo(id: number){
        this.http.delete<Todo>(this.url + "/" + id, this.httpOptions).subscribe((res) => console.log(res))
    }
    
}