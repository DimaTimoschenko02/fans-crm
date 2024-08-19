import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SqlConfigService } from './custom-config/sql-config.service';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [SqlConfigService],
      useFactory: (configService: SqlConfigService) =>
        configService.getConnectionOptions(),
    }),
    UserModule,
    CustomConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
