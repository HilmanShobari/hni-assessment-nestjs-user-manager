import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return login response', async () => {
      const mockRequest: any = {
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      };

      const mockResponse = {
        statusCode: HttpStatus.OK,
        message: 'Success login',
        data: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
          token: 'jwt-token',
        },
      };

      mockAuthService.login.mockResolvedValue(mockResponse);

      const result = await controller.login(mockRequest);

      expect(service.login).toHaveBeenCalledWith(mockRequest.body);
      expect(result).toEqual(mockResponse);
    });
  });
});
