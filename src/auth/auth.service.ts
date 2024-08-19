import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { UserService } from '../user/user.service';
import { TokenJwtService } from '../token-jwt/token-jwt.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenJwtService: TokenJwtService,
  ) {}

  public async signInUser(
    signInDto: SignInDto,
  ): Promise<{ authToken: string }> {
    const user = await this.validateUser(signInDto);

    const authToken = this.tokenJwtService.getAccessToken({
      id: user.id,
    });

    return { authToken };
  }

  public async validateUser({ email, password }: SignInDto) {
    const isExistsUser = await this.userService.getUserByEmail(email);

    if (!isExistsUser) throw new NotFoundException('IncorrectEmailOrPassword');

    const checkingResponse = await this.compareHashToInputValue(
      isExistsUser.password,
      password,
    );

    if (!checkingResponse)
      throw new BadRequestException('IncorrectEmailOrPassword');

    return isExistsUser;
  }

  private async compareHashToInputValue(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return await compare(password, hash);
  }
}
