import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";
import { NotFoundError } from "rxjs";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Post()
    async createTask(@Body() data: Task){
        return this.taskService.createTask(data);
    }

    @Get(':id')
    async getTaskById( @Param( 'id' ) id:string ) {
        const taskFound = await this.taskService.getTaskById(Number(id))

        if (!taskFound) throw new NotFoundException("La tarea con el id solicitado no existe")
        return taskFound 
    }

    @Delete(':id')
    async deleteTask( @Param( 'id' ) id:string ) {
        try{
            return await this.taskService.deleteTask(Number(id))
        }
        catch(error){
            throw new NotFoundException("La tarea no existe, asi que no se puede eliminar nada")
        }
    }

    @Put(':id')
    async updateTask( @Param( 'id' ) id:string, @Body() data:Task ) {
        try{
            return await this.taskService.updateTask(Number(id), data)
        }
        catch(error){
            throw new NotFoundException("La tarea no existe, asi que no se puede actualizar nada")
        }

    }
    
}
