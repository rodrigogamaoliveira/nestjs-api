import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FilterDto, DEFAULT_PAGE_SIZE } from "src/modules/pagination/dto/filter.dto";
import { PageService } from "src/modules/pagination/page.service";
import { UsersService } from "src/modules/users/users.service";
import { Repository } from "typeorm";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Project } from "../entities/project.entity";
@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly pageService: PageService,
        private readonly usersService: UsersService,
    ) { }
    async create(userEmail: string, createProjectDto: CreateProjectDto) {
        const user = await this.usersService.findOneByOrFail({
            email: userEmail,
        });
        return this.projectRepository.save({
            ...createProjectDto,
            user,
        });
    }
    async findAll(userEmail: string) {
        const user = await this.usersService.findOneBy({ email: userEmail });
        return this.projectRepository.find({ where: { user } });
    }
    async findAllPaginated(userEmail: string, filter?: FilterDto) {
        if (!filter) {
            return this.findAll(userEmail);
        }
        const user = await this.usersService.findOneBy({ email: userEmail });
        return this.pageService.paginate(
            this.projectRepository,
            {
                page: filter.page,
                pageSize: DEFAULT_PAGE_SIZE,
            },
            { user },
        );
    }
    async findOne(userEmail: string, id: number) {
        const user = await this.usersService.findOneBy({ email: userEmail });
        return this.projectRepository.find({
            where: { id, user },
            relations: ['tasks'],
        });
    }
    async update(
        userEmail: string,
        id: number,
        updateProjectDto: UpdateProjectDto,
    ) {
        const user = await this.usersService.findOneBy({ email: userEmail });
        const project = this.findOne(user.email, id);
        if (!project) {
            throw new NotFoundException();
        }
        return this.projectRepository.update(id, updateProjectDto);
    }
    async remove(id: number) {
        await this.projectRepository.softDelete(id);
    }
}