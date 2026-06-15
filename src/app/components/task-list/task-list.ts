import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskCard],

  templateUrl: './task-list.html',

  styleUrl: './task-list.css',
})
export class TaskList {
  @Input()
  tasks: any[] = [];

  @Output()
  statusUpdated = new EventEmitter<any>();

  @Output()
  taskDeleted = new EventEmitter<any>();

  @Output()
  taskUpdated = new EventEmitter<any>();

  handleStatusChanged(task: any, status: string) {
    this.statusUpdated.emit({
      task,
      status,
    });
  }

  handleDelete(task: any) {
    this.taskDeleted.emit(task);
  }

  handleTaskEdited(task: any, title: string) {
    this.taskUpdated.emit({
      task,
      title,
    });
  }
}
