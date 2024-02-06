import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  newTask: Task = new Task(0, '');

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTask.title.trim() !== '') {
      this.taskService.addTask(this.newTask).subscribe((task) => {
        this.router.navigate(['/task-details', task.id.toString()]);
      });
      this.loadTasks();
    }
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
    this.loadTasks();
  }

  viewDetails(task: Task): void {
    this.router.navigate(['/task-details', task.id.toString()]);
  }

  checkFinish(task: Task) {
    if (task.finish) {
      task.finish = false;
    } else {
      task.finish = true;
    }
    this.taskService.updateTask(task);
  }
}