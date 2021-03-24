import { CreateTaskDTO } from './DTO/create-task.dto';
import { Injectable, } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import  { v4 as uuid }  from 'uuid';
import { GetTasksFilterDTO } from './DTO/GetTaskFilter.dto';

@Injectable()
export class TasksService {
   private tasks: Tasks[] = [];

   // :hammer: Services are work in progress

    getAllTasks(): Tasks[] {
        return this.tasks
    }

    getTasksWithFilter(filterDto:GetTasksFilterDTO):Tasks[] {
        const { status, search } = filterDto

        let tasks = this.getAllTasks();
        if(status) {
          return  tasks = tasks.filter(task => task.status == status.toLocaleUpperCase())
        }

        if(search) {
           return tasks = tasks.filter(task => task.title.includes(search) 
                                || task.description.includes(search))
        }
    }

    getTaskByID(id: string): Tasks {
     return this.tasks.find(task => task.id === id)
    }


    createTask(createTaskDto: CreateTaskDTO):Tasks {
        const { title, description } = createTaskDto
        const task : Tasks = {
           id: uuid(),
           title,
           description,
           status: TaskStatus.OPEN,    
        }
       this.tasks.push(task)
       return task
    }

    updateTask(id:string, status: TaskStatus):Tasks {
        const task = this.getTaskByID(id)
        task.status = status
        return task
    }

    deleteTask(id: string):Tasks[] {
       return this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
