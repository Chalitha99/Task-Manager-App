

import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'all';

  constructor(
    private taskService: TaskService,
    private authService: AuthService, 
    private router: Router 
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.filterTasks();
      },
      error: (error) => console.error('Error loading tasks:', error)
    });
  }

  filterTasks() {
    if (this.selectedStatus === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }

  onStatusChange(task: Task, status: 'TO_DO' | 'IN_PROGRESS' | 'DONE') {
    const updatedTask = { ...task, status };
    this.taskService.updateTask(updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error updating task:', error)
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error deleting task:', error)
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Logout failed:', error);
        this.router.navigate(['/login']); 
      }
    });
  }
}