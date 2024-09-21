import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "../entities/project.entity";
import { PageService } from "src/modules/pagination/page.service";
import { FilterDto, DEFAULT_PAGE_SIZE } from "src/modules/pagination/dto/filter.dto";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly pageService: PageService,
    ) { }

    create(data: CreateProjectDto) {
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

    findAllPaginated(filter?: FilterDto) {
        if (!filter) {
            return this.findAll();
        }
        return this.pageService.paginate(this.projectRepository, {
            page: filter.page,
            pageSize: DEFAULT_PAGE_SIZE,
        });
    }
}