import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBaseUrl() {
    return this.apiUrl;
  }

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getTasksEndpoint());
  }

  createTask(title: string, priority: string, status: string) {
    return this.http.post(this.getTasksEndpoint(), {
      title,
      priority,
      status,
    });
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.getTasksEndpoint()}/${id}`);
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.getTasksEndpoint()}/${id}`, task);
  }

  getTasksEndpoint() {
    return `${this.apiUrl}${API_ENDPOINTS.tasks}`;
  }

  getLoginEndpoint() {
    return `${this.apiUrl}${API_ENDPOINTS.login}`;
  }
}
