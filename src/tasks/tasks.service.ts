import { CreateTaskDTO } from './DTO/create-task.dto';
import { Injectable, NotFoundException, } from '@nestjs/common';
import { Tasks, TaskStatus } from './tasks.model';
import  { v4 as uuid }  from 'uuid';
import { GetTasksFilterDTO } from './DTO/GetTaskFilter.dto';

@Injectable()
export class TasksService {
   private tasks: Tasks[] = [];

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
        const found = this.tasks.find(task => task.id === id)

        if(!found) {
           throw new NotFoundException(`Cannot find task with ID: [${id}]` );
        }

        return found
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
       const found = this.getTaskByID(id)
       return this.tasks = this.tasks.filter(task => task.id !== found.id)
    }
}
