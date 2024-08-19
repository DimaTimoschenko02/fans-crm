import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class SqlConfigService {
  private readonly mysqlConnectionOptions: Partial<SequelizeModuleOptions>; //SequelizeModuleOptions

  constructor(configService: ConfigService) {
    this.mysqlConnectionOptions = {
      dialect: 'mysql',
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_DATABASE'),
      host: configService.get<string>('MYSQL_HOST'),
      port: configService.get<number>('MYSQL_PORT'),
      username: configService.get<string>('MYSQL_USERNAME'),
      models: [User],
      synchronize: true,
      autoLoadModels: true,
      logging: true,
    };

    console.log(this.mysqlConnectionOptions);
  }

  public async getConnectionOptions(): Promise<any> {
    return this.mysqlConnectionOptions;
  }
}
