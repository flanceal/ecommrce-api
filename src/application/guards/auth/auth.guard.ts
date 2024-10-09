import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payloadHeaders = jwtDecode(token, { header: true });
    const payload = jwtDecode(token);

    const validateAccessToken = (
      payloadIss: string,
      payloadAud: string,
      payloadAlg: string,
    ) => {
      return (
        payloadIss === this.configService.get('AUTH0_ISSUER_BASE_URL') &&
        payloadAud === this.configService.get('AUTH0_AUDIENCE') &&
        payloadAlg === this.configService.get('AUTH0_SIGNING_ALG')
      );
    };

    const isValid = validateAccessToken(
      payload.iss,
      payload.aud[0],
      payloadHeaders.alg,
    );
    if (isValid) {
      request['user'] = payload;

      const userId = payload.sub.split('|')[1];
      request['userId'] = userId;

      return true;
    } else {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): undefined | string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
