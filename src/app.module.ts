import { CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardService } from './modules/auth/auth-guard/auth-guard.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProjectModule,
    TaskModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_GUARD,
    useClass: AuthGuardService,
    },
    ],
})
export class AppModule {}
