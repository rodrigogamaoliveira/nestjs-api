import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async create(data: CreateProjectDto) {
        return this.projectRepository.save(data);
    }

    findAll() {
        return this.projectRepository.find();
    }
    findOne(id: number) {
        return this.projectRepository.findOne({ id });
    }
    update(id: number, updateTaskDto: UpdateProjectDto) {
        return this.projectRepository.update(id, updateTaskDto);
    }
    remove(id: number) {
        return this.projectRepository.delete(id);
    }
}