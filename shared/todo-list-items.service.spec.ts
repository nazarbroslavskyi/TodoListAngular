import { TestBed } from '@angular/core/testing';

import { TodoListItemsService } from './todo-list-items.service';

describe('TodoListItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoListItemsService = TestBed.get(TodoListItemsService);
    expect(service).toBeTruthy();
  });
});
