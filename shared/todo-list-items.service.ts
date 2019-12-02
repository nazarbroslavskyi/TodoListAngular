import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TodoItem } from "../src/app/dashboard/todo-item";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoListItemsService {

  constructor(private http: HttpClient) { }

  getTodoListItems() {
    return this.http.get('https://angular-backend-ad6fe.firebaseio.com/todolist.json').pipe(
      map(responceOfData => {
        const arrayOfTodoItems:TodoItem[] = [];
        for(const key in responceOfData) {
          if(responceOfData.hasOwnProperty(key)) {
            arrayOfTodoItems.push({...responceOfData[key], id: key})
          }
        }
        return arrayOfTodoItems;
      })
    )
  }

  postTodoListItem(todoItem: TodoItem): Observable<any> {
    return this.http.post<any>('https://angular-backend-ad6fe.firebaseio.com/todolist.json',
      todoItem
    );
  }

  updateTodoListItemTitle(idOfItem: string, payload: {}) {
    // console.log(idOfItem);
    this.http.patch(`https://angular-backend-ad6fe.firebaseio.com/todolist/${idOfItem}.json`, payload).subscribe(data => {
      // console.log('done');
    })
  }

  makeTodoListItemImportant(idOfItem: string, payload: {}): Observable<Object> {
    // console.log(idOfItem);
    return this.http.patch(`https://angular-backend-ad6fe.firebaseio.com/todolist/${idOfItem}.json`, payload);
  }

  makeTodoListItemDone(idOfItem: string, payload: {}): Observable<Object> {
    // console.log(idOfItem);
    return this.http.patch(`https://angular-backend-ad6fe.firebaseio.com/todolist/${idOfItem}.json`, payload);
  }

  deleteTodoListItem(indexOfTodoListItem) {
    return this.http.delete(`https://angular-backend-ad6fe.firebaseio.com/todolist/${indexOfTodoListItem}.json`).subscribe(_ => {
      // console.log('delete');
    });
  }

}
