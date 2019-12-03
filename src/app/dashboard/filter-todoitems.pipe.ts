import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from "./todo-item";

@Pipe({
    name: 'todoItemsFilter'
  })
export class TodoItemsFilter implements PipeTransform {
  transform(arrayOfItems: TodoItem[], valueOfInput: string, allItems: boolean, importantItems: boolean, doneItems: boolean): TodoItem[]  {
    if (allItems) return arrayOfItems.filter(item => item.title.startsWith(valueOfInput));
    if (importantItems) return arrayOfItems.filter(item => item.title.startsWith(valueOfInput) && item.important);
    if(doneItems)  return arrayOfItems.filter(item => item.title.startsWith(valueOfInput) && item.done);
    if(!valueOfInput) return arrayOfItems;
    return arrayOfItems.filter(item => item.title.startsWith(valueOfInput));
  }
}
