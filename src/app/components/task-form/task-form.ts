import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  newTask = '';
  newPriority = 'Medium';
  newStatus = 'Pending';

  @Output()
  taskAdded = new EventEmitter<any>();

  addTask() {
    if (this.newTask.trim()) {
      this.taskAdded.emit({
        title: this.newTask,
        priority: this.newPriority,
        status: this.newStatus,
      });
      this.newTask = '';
      this.newPriority = 'Medium';
      this.newStatus = 'Pending';
    }
  }
}
