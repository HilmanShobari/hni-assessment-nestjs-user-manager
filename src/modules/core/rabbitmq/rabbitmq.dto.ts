import { HttpStatus } from '@nestjs/common';

type TRabbitCommand =
  | 'post:auth/login'
  | 'get:users'
  | 'post:users'
  | 'get:users/id'
  | 'put:users/id'
  | 'delete:users/id';

export interface IRabbitError {
  type: ERabbitErrorCode;
  httpError: IHttpRabbitError | null;
}

export interface IRabbitMessage<T = any> {
  command: TRabbitCommand;
  correlationId: string;
  data: T;
  error: IRabbitError | null;
}

export enum ERabbitErrorCode {
  VALIDATION = '01',
  FETCH_ERROR = '02',
  MANAGER_SEND_TO_RABBIT_ERROR = '11',
  MANAGER_CONSUME_TIMEOUT = '12',
  INVALID_COMMAND = '400',
  UNKNOWN = '500',
  HTTP = 'http',
}

export interface IHttpRabbitError {
  statusCode: HttpStatus;
  message: string;
}
