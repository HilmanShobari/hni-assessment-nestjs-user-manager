import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { FastifyRequestWithAuth } from 'src/modules/auth/auth.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('User')
@UseGuards(AuthGuard)
@Controller({ path: 'users' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Get('public')
  @HttpCode(HttpStatus.OK)
  public() {
    return 'Hello World!';
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: FastifyRequestWithAuth) {
    return await this.service.findAll(req.params);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: FastifyRequestWithAuth) {
    return await this.service.create(req.body);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Req() req: FastifyRequestWithAuth) {
    return await this.service.findById(req.params);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Req() req: FastifyRequestWithAuth) {
    return await this.service.delete(req.params);
  }
}
