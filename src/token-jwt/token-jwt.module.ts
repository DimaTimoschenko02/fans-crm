import { Module } from '@nestjs/common';

import { TokenJwtService } from './token-jwt.service';
import { CustomConfigModule } from 'src/custom-config/custom-config.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CustomConfigModule, JwtModule.register({})],
  providers: [TokenJwtService],
  exports: [TokenJwtService],
})
export class TokenJwtModule {}
