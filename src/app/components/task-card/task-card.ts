import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, CommonModule, FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input()
  task: any;

  @Output()
  statusChanged = new EventEmitter<string>();

  @Output()
  deleteClicked = new EventEmitter<void>();

  @Output()
  taskEdited = new EventEmitter<string>();

  isEditing = false;
  editedTitle = '';

  getStatusClass(status: string) {
    if (status === 'Pending') {
      return 'pending';
    }

    if (status === 'In Progress') {
      return 'in-progress';
    }

    return 'completed';
  }

  changeStatus(status: string) {
    this.statusChanged.emit(status);
  }

  deleteTask() {
    this.deleteClicked.emit();
  }

  startEdit() {
    this.isEditing = true;
    this.editedTitle = this.task.title;
  }

  saveEdit() {
    if (this.editedTitle.trim()) {
      this.taskEdited.emit(this.editedTitle);
      this.isEditing = false;
    }
  }
}
