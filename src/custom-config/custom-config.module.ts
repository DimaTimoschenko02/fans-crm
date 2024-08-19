import { Module } from '@nestjs/common';
import { SqlConfigService } from './sql-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
  ],
  exports: [SqlConfigService],
  providers: [SqlConfigService],
})
export class CustomConfigModule {}
