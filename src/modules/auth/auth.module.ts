import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'chave-super-hiper-secreta',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuardService, AuthService, UsersService],
  exports: [AuthGuardService, JwtModule],
})
export class AuthModule {}