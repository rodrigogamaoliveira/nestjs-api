import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './controllers/task.controller';
import { Task } from './entities/task.entity';
import { TasksService } from './services/task.service';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project]),
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TaskModule {}
