import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { Project } from "src/modules/project/entities/project.entity";
import { User } from "src/modules/users/entities/user.entity";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { CreateTaskDto } from "../dto/create-task.dto";

@Injectable()
export class TasksService {
constructor(
@InjectRepository(Task)
private readonly taskRepository: Repository<Task>,
@InjectRepository(Project)
private readonly projectRepository: Repository<Project>,
@InjectRepository(User)
private readonly usersRepository: Repository<User>,
) {}

async create(userEmail: string, createTaskDto: CreateTaskDto) {
    const user = await this.usersRepository.findOneOrFail({
    email: userEmail,
    });
    const project = await this.projectRepository.findOneOrFail({
    id: createTaskDto.projectId,
    user,
    });
    return this.taskRepository.save({
    ...createTaskDto,
    project,
    user,
    });
    }
    async findAll(userEmail: string) {
    const user = await this.usersRepository.findOneOrFail({
    email: userEmail,
    });
    return this.taskRepository.find({
    relations: ["project"],
    where: { user },
    });
    }
    async findOne(userEmail: string, id: number) {
    const user = await this.usersRepository.findOneOrFail({
    email: userEmail,
    });
    return this.taskRepository.find({
    where: { id, user },
    relations: ["project"],
    });
    }
    async update(userEmail: string, id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.usersRepository.findOneOrFail({
    email: userEmail,
    });
    const task = this.taskRepository.findOneOrFail({ id, user });
    if (!task) {
    throw new UnauthorizedException();
    }
    return this.taskRepository.update(id, updateTaskDto);
    }
    remove(id: number) {
    return this.taskRepository.softDelete(id);
    }
}