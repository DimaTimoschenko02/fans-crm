import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

@Injectable()
export class SqlConfigService {
  private readonly connectionLink: string;
  private readonly mysqlConnectionOptions: Partial<SequelizeModuleOptions>; //SequelizeModuleOptions

  constructor(configService: ConfigService) {
    this.connectionLink = configService.get<string>('MYSQL_URL');
    console.log(this.connectionLink);
    this.mysqlConnectionOptions = {
      dialect: 'mysql',
      password: 'root',
      database: 'users',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // uri: this.connectionLink,
      models: [User],
      synchronize: true,
      autoLoadModels: true,
      logging: true,
    };
  }

  public async getConnectionOptions(): Promise<any> {
    return this.mysqlConnectionOptions;
  }
}
