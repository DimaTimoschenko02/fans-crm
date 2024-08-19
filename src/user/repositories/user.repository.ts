import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) public readonly userModel: typeof User) {}

  public async create(user: any): Promise<User> {
    return this.userModel.create(user);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  public async getUserById(id: number): Promise<User> {
    return (await this.userModel.findByPk(id)).get();
  }
}
