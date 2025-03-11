import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return Hello World for public route', () => {
    expect(controller.public()).toBe('Hello World!');
  });

  it('should call findAll', async () => {
    const mockRequest = { params: { sender_email: 'test@mail.com' } } as any;
    const result = { success: true, data: [] };
    mockUserService.findAll.mockResolvedValue(result);

    const response = await controller.findAll(mockRequest);
    expect(service.findAll).toHaveBeenCalledWith(mockRequest.params);
    expect(response).toEqual(result);
  });

  it('should call create', async () => {
    const mockRequest = {
      body: {
        sender_email: 'admin@mail.com',
        name: 'John',
        email: 'john@mail.com',
        password: 'pass123',
        role: 1,
      },
    } as any;

    const result = { success: true, data: mockRequest.body };
    mockUserService.create.mockResolvedValue(result);

    const response = await controller.create(mockRequest);
    expect(service.create).toHaveBeenCalledWith(mockRequest.body);
    expect(response).toEqual(result);
  });

  it('should call findById', async () => {
    const mockRequest = { params: { sender_email: 'admin@mail.com', id: 1 } } as any;
    const result = { success: true, data: { id: 1, name: 'John', email: 'john@mail.com', role: 'admin' } };
    mockUserService.findById.mockResolvedValue(result);

    const response = await controller.findById(mockRequest);
    expect(service.findById).toHaveBeenCalledWith(mockRequest.params);
    expect(response).toEqual(result);
  });

  it('should call delete', async () => {
    const mockRequest = { params: { sender_email: 'admin@mail.com', id: 1 } } as any;
    const result = { success: true };
    mockUserService.delete.mockResolvedValue(result);

    const response = await controller.delete(mockRequest);
    expect(service.delete).toHaveBeenCalledWith(mockRequest.params);
    expect(response).toEqual(result);
  });
});
