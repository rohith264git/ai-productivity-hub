import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  private apiUrl = environment.apiUrl;

  private mockTasks: Task[] = [
    {
      title: 'Complete Angular',
      priority: 'High',
      status: 'Pending'
    },
    {
      title: 'Build Backend',
      priority: 'Medium',
      status: 'In Progress'
    }
  ];

constructor(
  private http: HttpClient
) {}

  getBaseUrl() {
    return this.apiUrl;
  }

  fetchTasks(): Observable<Task[]> {

    return of(this.mockTasks);

  }

  createTask(title: string,priority: string,status: string) {
  this.mockTasks.push({title,priority,status});
}

deleteTask(index: number) {

  this.mockTasks.splice(index, 1);

}

updateTask(
  index: number,
  status: string
) {

  this.mockTasks[index].status = status;

}

getTasksEndpoint() {

  return `${this.apiUrl}${API_ENDPOINTS.tasks}`;

}

testHttpClient() {

  console.log(
    'HttpClient Ready'
  );

}

getLoginEndpoint() {

  return `${this.apiUrl}${API_ENDPOINTS.login}`;

}

}