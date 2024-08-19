import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { AuthTokenPayloadType } from 'src/token-jwt/types/auth-token-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenJwtService {
  private readonly jwtSecret: string;
  private readonly jwtExpireTime: string;

  public constructor(private readonly customConfigService: ConfigService) {
    this.jwtSecret = this.customConfigService.get<string>('JWT_SECRET_KEY');
    this.jwtExpireTime = this.customConfigService.get<string>(
      'JWT_TOKEN_EXPIRE_TIME',
    );
  }

  public getAccessToken(payload: AuthTokenPayloadType): string {
    return sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpireTime,
    });
  }

  public decodeToken(token: string): JwtPayload {
    try {
      return verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      return error;
    }
  }
}
