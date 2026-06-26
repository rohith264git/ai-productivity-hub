import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AiApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generateTasks(goal: string) {
    return this.http.post(`${this.apiUrl}${API_ENDPOINTS.generateAI}`, {
      goal,
    });
  }
}
