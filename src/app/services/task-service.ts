import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { TaskApiService } from './task-api-service';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  constructor(
  private taskApiService: TaskApiService) {}

getTasks(): Observable<Task[]> {

  return this.taskApiService.fetchTasks();

}

  getApiBaseUrl() {
  return this.taskApiService.getBaseUrl();
}

addTask(title: string,priority: string,status: string) {
  this.taskApiService.createTask(title,priority,status);
}

deleteTask(index: number) {
  this.taskApiService.deleteTask(index);
}

updateTaskStatus(index: number,status: string) {
  this.taskApiService.updateTask(index,status);
}

getTasksEndpoint() {

  return this.taskApiService.getTasksEndpoint();

}

}
