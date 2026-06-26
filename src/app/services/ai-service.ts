import { Injectable } from '@angular/core';
import { AiApiService } from './ai-api-service';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private aiApiService: AiApiService) {}

  generateTasks(goal: string) {
    return this.aiApiService.generateTasks(goal);
  }
}
