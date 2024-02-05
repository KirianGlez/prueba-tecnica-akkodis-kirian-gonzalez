import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  taskId: number;
  task: Task;
  taskForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = +params.get('id');
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.task = task;
        
        if (!this.task) {
          // Si la tarea no se encuentra, redirige a una página de error o a la lista de tareas
          this.router.navigate(['/error']); // Ajusta la ruta según tus necesidades
        }
  
        this.buildForm();
      })

      
    });
  }

  private buildForm(): void {
    this.taskForm = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description],
      location: [this.task.location],
    });
  }

  onSubmit(): void {
    // Manejar la lógica de actualización de la tarea aquí
    const updatedTask: Task = {
      id: this.taskId,
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      location: this.taskForm.value.location,
    };

    this.taskService.updateTask(updatedTask);
    this.router.navigate(['/task-list']); // Redirige a la lista de tareas después de la actualización
  }

}
