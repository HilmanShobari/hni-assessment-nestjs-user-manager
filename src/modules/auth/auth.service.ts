import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/modules/core/rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';
import { IRabbitMessage } from 'src/modules/core/rabbitmq/rabbitmq.dto';
import { AppError } from 'src/modules/common/app-error/app-error';
import { Validator } from 'src/modules/common/validator/validator';
import { LoginSchema } from './auth.validator';
import { IUserLoginResponse, TLoginSchema } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly rabbitInstance: RabbitmqService) {}

  async login(data: unknown): Promise<IUserLoginResponse> {
    try {
      const validatedData = Validator.validate({
        schema: LoginSchema,
        data: <TLoginSchema>data,
      });

      const message: IRabbitMessage<TLoginSchema> = {
        command: 'post:auth/login',
        correlationId: uuidv4(),
        data: validatedData,
        error: null,
      };

      const response =
        await this.rabbitInstance.send<IUserLoginResponse>(message);

      return response.data;
    } catch (error) {
      AppError.handleError(error);
    }
  }
}
