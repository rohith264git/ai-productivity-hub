import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskApiService } from './task-api-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private taskApiService: TaskApiService) {}

  getTasks(): Observable<Task[]> {
    return this.taskApiService.fetchTasks();
  }

  getApiBaseUrl() {
    return this.taskApiService.getBaseUrl();
  }

  addTask(title: string, priority: string, status: string) {
    return this.taskApiService.createTask(title, priority, status);
  }

  deleteTask(id: string) {
    return this.taskApiService.deleteTask(id);
  }

  updateTaskStatus(id: string, task: any) {
    return this.taskApiService.updateTask(id, task);
  }

  getTasksEndpoint() {
    return this.taskApiService.getTasksEndpoint();
  }
}
