import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { omit } from 'lodash';
import { hashSync } from 'bcrypt';
import { User } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;

  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(user: UserDto) {
    const isExistsEmail = await this.userRepository.getUserByEmail(user.email);

    if (isExistsEmail) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = this.hashPassword(user.password);
    await this.userRepository.create({ ...user, password: hashedPassword });

    return omit(user, 'password');
  }

  public async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);

    if (user) return omit(user, 'password');
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  public hashPassword(password: string): string {
    return hashSync(password, this.saltRounds);
  }
}
