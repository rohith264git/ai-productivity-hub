import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service';
import { Task } from '../../models/task.model';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskList } from '../../components/task-list/task-list';
import { AiService } from '../../services/ai-service';

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
  goal = '';
  isGeneratingAI = false;

  constructor(
    public taskService: TaskService,
    private aiService: AiService,
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;

      this.isLoading = false;
    });
  }

  generateAITasks() {
    if (!this.goal.trim()) {
      alert('Please enter a goal.');
      return;
    }

    this.isGeneratingAI = true;

    this.aiService.generateTasks(this.goal).subscribe({
      next: () => {
        this.goal = '';
        this.loadTasks();
        this.isGeneratingAI = false;
      },

      error: (error) => {
        console.error(error);

        alert('Failed to generate AI tasks.');

        this.isGeneratingAI = false;
      },
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
    this.taskService.addTask(task.title, task.priority, task.status).subscribe(() => {
      this.loadTasks();
    });
  }

  handleStatusUpdate(data: any) {
    const updatedTask = {
      ...data.task,

      status: data.status,
    };

    this.taskService.updateTaskStatus(data.task._id!, updatedTask).subscribe(() => {
      this.loadTasks();
    });
  }

  handleDeleteTask(task: any) {
    this.taskService.deleteTask(task._id!).subscribe(() => {
      this.loadTasks();
    });
  }

  handleTaskUpdate(data: any) {
    data.task.title = data.title;
  }
}
