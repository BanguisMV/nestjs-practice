import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './../tasks.model';

export class GetTasksFilterDTO {

    @IsOptional()
    @IsIn([ TaskStatus.OPEN,TaskStatus.DONE, TaskStatus.IN_PROGRESS ])
    readonly status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    readonly search: string;
}