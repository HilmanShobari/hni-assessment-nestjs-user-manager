import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Validator } from 'src/modules/common/validator/validator';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/modules/common/decorators/public.decorator';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';
import { RedisService } from 'src/modules/core/redis/redis.service';
import { AppError } from 'src/modules/common/app-error/app-error';
import { HttpStatus } from '@nestjs/common';
import { FastifyRequestWithAuth, TJwtSchema } from './auth.dto';
import { JwtSchema } from './auth.validator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly reflector: Reflector,
    private readonly redis: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context
      .switchToHttp()
      .getRequest<FastifyRequestWithAuth<TJwtSchema>>();

    if (!req.headers['authorization']) {
      throw new AppError({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized. Authorization Required',
      });
    }

    const validatedHeader = Validator.validate({
      schema: JwtSchema,
      data: <TJwtSchema>req.headers,
    });

    const jwtPayload = this.cryptoService.verifyJwtToken(
      validatedHeader.authorization,
    );

    const cachedToken = await this.redis.get('jwt', jwtPayload.email);

    if (!cachedToken) {
      throw new AppError({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized. Invalid Access Token',
        debug: 'Unauthorized. Invalid Access Token',
      });
    }

    req.query.sender_email = jwtPayload.email;
    req.params.sender_email = jwtPayload.email;
    if (!req.body) {
      req.body = {
        sender_email: jwtPayload.email,
      };
    } else {
      req.body.sender_email = jwtPayload.email;
    }

    return true;
  }
}
