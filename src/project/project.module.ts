import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { TasksService } from 'src/task/services/task.service';
import { ProjectsController } from './controllers/project.controller';
import { Project } from './entities/project.entity';
import { ProjectService } from './services/project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
  ],
  providers: [ProjectService, TasksService],
  controllers: [ProjectsController]
})
export class ProjectModule {}
