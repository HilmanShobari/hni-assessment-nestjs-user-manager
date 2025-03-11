import { Injectable } from '@nestjs/common';
import { RabbitmqService } from 'src/modules/core/rabbitmq/rabbitmq.service';
import { v4 as uuidv4 } from 'uuid';
import { IRabbitMessage } from 'src/modules/core/rabbitmq/rabbitmq.dto';
import { AppError } from 'src/modules/common/app-error/app-error';
import {
  IFindAllUserResponse,
  IFindOneUserResponse,
  TCreateUserSchema,
  TFindOneUserSchema,
} from 'src/modules/user/user.dto';
import { Validator } from 'src/modules/common/validator/validator';
import { IBaseResponse } from 'src/modules/common/dto/response.dto';
import {
  CreateUserSchema,
  FindAllUserSchema,
  FindOneUserSchema,
} from './user.validator';

@Injectable()
export class UserService {
  constructor(private readonly rabbitInstance: RabbitmqService) {}

  async findAll(data: unknown): Promise<IFindAllUserResponse> {
    try {
      const validatedData = Validator.validate({
        schema: FindAllUserSchema,
        data: <TFindOneUserSchema>data,
      });

      const message: IRabbitMessage<TFindOneUserSchema> = {
        command: 'get:users',
        correlationId: uuidv4(),
        data: validatedData,
        error: null,
      };

      const response =
        await this.rabbitInstance.send<IFindAllUserResponse>(message);

      return response.data;
    } catch (error) {
      AppError.handleError(error);
    }
  }

  async create(data: unknown): Promise<IFindOneUserResponse> {
    try {
      const validatedData = Validator.validate({
        schema: CreateUserSchema,
        data: <TCreateUserSchema>data,
      });

      const message: IRabbitMessage<TCreateUserSchema> = {
        command: 'post:users',
        correlationId: uuidv4(),
        data: validatedData,
        error: null,
      };

      const response =
        await this.rabbitInstance.send<IFindOneUserResponse>(message);

      return response.data;
    } catch (error) {
      AppError.handleError(error);
    }
  }

  async findById(data: unknown): Promise<IFindOneUserResponse> {
    try {
      const validatedData = Validator.validate({
        schema: FindOneUserSchema,
        data: <TFindOneUserSchema>data,
      });

      const message: IRabbitMessage<TFindOneUserSchema> = {
        command: 'get:users/id',
        correlationId: uuidv4(),
        data: validatedData,
        error: null,
      };

      const response =
        await this.rabbitInstance.send<IFindOneUserResponse>(message);

      return response.data;
    } catch (error) {
      AppError.handleError(error);
    }
  }

  async delete(data: unknown): Promise<IBaseResponse> {
    try {
      const validatedData = Validator.validate({
        schema: FindOneUserSchema,
        data: <TFindOneUserSchema>data,
      });

      const message: IRabbitMessage<TFindOneUserSchema> = {
        command: 'delete:users/id',
        correlationId: uuidv4(),
        data: validatedData,
        error: null,
      };

      const response = await this.rabbitInstance.send<IBaseResponse>(message);

      return response.data;
    } catch (error) {
      AppError.handleError(error);
    }
  }
}
