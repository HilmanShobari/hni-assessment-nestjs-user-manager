import { HttpStatus, Injectable } from '@nestjs/common';
import { configFn } from 'src/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from 'src/modules/common/app-error/app-error';

@Injectable()
export class CryptoService {
  private readonly publicKey = configFn().RSA_PUBLIC_KEY!;

  verifyJwtToken(token: string): JwtPayload {
    try {
      const payload = <JwtPayload>(
        jwt.verify(token, this.publicKey, { algorithms: ['RS256'] })
      );
      return payload;
    } catch (error) {
      throw new AppError({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized. Invalid Access Token',
        debug: error instanceof Error ? error.message : error,
      });
    }
  }
}
