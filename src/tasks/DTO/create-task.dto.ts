import { IsNotEmpty } from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty()
    readonly title:       string;

    @IsNotEmpty()
    readonly description: string;
}