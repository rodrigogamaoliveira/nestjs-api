import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { TasksService } from './services/task.service';
import { TasksController } from './controllers/task.controller';
import { Task } from './entities/task.entity';
import { Project } from '../project/entities/project.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task, Project, User]),
        UsersModule,
    ],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService],
})
export class TaskModule {}