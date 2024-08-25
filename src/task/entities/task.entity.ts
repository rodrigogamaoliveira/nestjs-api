import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../project/entities/project.entity";
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", nullable: false })
    name: string;
    @Column({ name: "status", nullable: false })
    status: TaskStatus;
    @ManyToOne(() => Project, (project) => project.tasks, {
        cascade: true,
        nullable: false,
    })
    project: Project;
}
export enum TaskStatus {
    pending = "pending",
    completed = "completed",
}
