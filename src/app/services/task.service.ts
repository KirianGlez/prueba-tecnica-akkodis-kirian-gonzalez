import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  getTasks(): Observable<Task[]> {
    const storedTasks = localStorage.getItem(this.localStorageKey) ? JSON.parse(localStorage.getItem(this.localStorageKey)) : [];
    return of(storedTasks);
  }

  updateTask(updatedTask: Task): void {
    this.getTasks().subscribe(tasks => {
      const index = tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
        localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
      }
    });
  }

  addTask(data: Task): Observable<Task> {
    
    return new Observable<Task>(observer => {
      this.getTasks().subscribe(tasks => {
        data.id = tasks.length + 1;
        const task = data;
          tasks.push(task);
          localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
        observer.next(task);
        observer.complete();
      });
    });
  }

  deleteTask(index: number): void {
    this.getTasks().subscribe( data => {
      data.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    })
    
  }

  getTaskById(taskIdNumber: number): Observable<Task> {
    
    return new Observable<Task>(observer => {
      this.getTasks().subscribe(data => {
        const foundTask = data.find(task => task.id === taskIdNumber);
        observer.next(foundTask);
        observer.complete();
      });
    });
  }
}