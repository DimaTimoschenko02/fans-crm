import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { CustomConfigModule } from '../custom-config/custom-config.module';
import { TokenJwtModule } from '../token-jwt/token-jwt.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CustomConfigModule, TokenJwtModule, UserModule],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
