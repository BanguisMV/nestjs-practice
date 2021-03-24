import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    @Get()
    getAllTasks() {
        return [
            {status:'DONE', title:"Whatever"}
        ]
    }

    @Get(":id") 
    getTaskById() {
        return [
            {status:'DONE', title:"Whatever"}
        ]
    }
}
