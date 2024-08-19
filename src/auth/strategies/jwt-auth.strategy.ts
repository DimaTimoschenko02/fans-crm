import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthTokenPayloadType } from 'src/token-jwt/types/auth-token-payload.type';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  public validate(payload: AuthTokenPayloadType): AuthTokenPayloadType {
    if (!payload) {
      throw new UnauthorizedException('Unauthorized');
    }

    return payload;
  }
}
