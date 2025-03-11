import { IBaseResponse } from 'src/modules/common/dto/response.dto';
import { IUser } from 'src/modules/user/user.dto';
import { FastifyRequest } from 'fastify';
import { JwtSchema, LoginSchema } from './auth.validator';
import { z } from 'zod';

export type TJwtSchema = z.TypeOf<typeof JwtSchema>;
export type TLoginSchema = z.TypeOf<typeof LoginSchema>;

export interface FastifyRequestWithAuth<T = unknown> extends FastifyRequest {
  validatedHeader: T;
  query: {
    sender_email: string;
  };
  body: {
    sender_email: string;
  };
  params: {
    sender_email: string;
  };
}

export interface IUserLoginResponse extends IBaseResponse {
  data: IUser & {
    token: string;
  };
}
