import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { PaginationModule } from '../pagination/pagination.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { ProjectsController } from './controllers/project.controller';
import { ProjectsService } from './services/project.service';
@Module({
imports: [
PaginationModule,
UsersModule,
TypeOrmModule.forFeature([Project, User]),
],
controllers:[ProjectsController],
providers:  [ProjectsService],
exports: [ProjectsService],
})
export class ProjectModule {}