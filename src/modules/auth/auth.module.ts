import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuardService } from './auth-guard/auth-guard.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthGuardService],
  exports: [AuthGuardService, JwtModule],
})
export class AuthModule {}