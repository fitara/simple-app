import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private _http: HttpClient) {}

  addTodo(data: any): Observable<any> {
    return this._http.post('https://jsonplaceholder.typicode.com/todos', data);
  }

  updateTodo(id: number, data: any): Observable<any> {
    return this._http.put(`https://jsonplaceholder.typicode.com/todos/${id}`, data);
  }

  getTodoList(): Observable<any> {
    return this._http.get('https://jsonplaceholder.typicode.com/todos');
  }

  deleteTodo(id: number): Observable<any> {
    return this._http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}