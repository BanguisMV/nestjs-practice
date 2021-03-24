import { GetTasksFilterDTO } from './DTO/GetTaskFilter.dto';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { Tasks, TaskStatus } from './tasks.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDTO):Tasks[] {
        if(Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilter(filterDto)
        } else {
            return this.taskService.getAllTasks()
        }
    }

    @Get("/:id") 
    getTaskById(@Param('id') id:string):Tasks {
        return this.taskService.getTaskByID(id)
    }

    @Post() 
    addTask(@Body() createTaskDto: CreateTaskDTO ) {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete("/:id")
    deleteTask(@Param('id') id:string ) {
        return this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id:string, @Body('status') status:TaskStatus): Tasks {
        return this.taskService.updateTask(id, status)
    }
}
