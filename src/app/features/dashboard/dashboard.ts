import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/task.model';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskForm, TaskList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  tasks: Task[] = [];
  isLoading = true;
  searchText = '';
  selectedStatus = 'All';

  constructor(public taskService: TaskService) {}

  ngOnInit() {
console.log(
  this.taskService.getTasksEndpoint()
);
    this.taskService.getTasks().subscribe((response) => {
      this.tasks = response;
      this.isLoading = false;
    });
  }

  filteredTasks() {
    return this.tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All' || task.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  handleTaskAdded(task: any) {
    this.taskService.addTask(task.title, task.priority, task.status);
  }

  handleStatusUpdate(data: any) {
    data.task.status = data.status;
  }

  handleDeleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    this.taskService.deleteTask(index);
  }

  handleTaskUpdate(data: any) {
    data.task.title = data.title;
  }
}
