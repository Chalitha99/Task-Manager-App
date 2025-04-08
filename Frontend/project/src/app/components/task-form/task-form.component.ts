import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]], 
      description: ['', Validators.maxLength(100)], 
      status: ['TO_DO', Validators.required]
    });
  }

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  loadTask() {
    this.taskService.getTaskById(this.taskId!).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (error) => console.error('Error loading task:', error)
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = this.taskForm.value;
    
    if (this.isEditMode) {
      task.id = this.taskId;
      this.taskService.updateTask(task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Error updating task:', error)
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (error) => console.error('Error creating task:', error)
      });
    }
  }
}