import { IBaseResponse } from 'src/modules/common/dto/response.dto';
import { z } from 'zod';
import { CreateUserSchema, FindAllUserSchema, FindOneUserSchema } from './user.validator';


export type TFindAllUserSchema = z.TypeOf<typeof FindAllUserSchema>;
export type TCreateUserSchema = z.TypeOf<typeof CreateUserSchema>;
export type TFindOneUserSchema = z.TypeOf<typeof FindOneUserSchema>;


export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
export enum UserRoleEnum {
  admin = 1,
  user = 2,
}

export interface IFindAllUserResponse extends IBaseResponse {
  data: IUser[];
}

export interface IFindOneUserResponse extends IBaseResponse {
  data: IUser;
}
