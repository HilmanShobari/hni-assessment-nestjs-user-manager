import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RabbitmqService } from 'src/modules/core/rabbitmq/rabbitmq.service';
import { TLoginSchema } from './auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let rabbitmqService: RabbitmqService;

  const mockRabbitmqService = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: RabbitmqService, useValue: mockRabbitmqService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    rabbitmqService = module.get<RabbitmqService>(RabbitmqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should send login message via rabbit and return user data', async () => {
      const loginDto: TLoginSchema = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockResponse = {
        statusCode: 200,
        message: 'Success login',
        data: {
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
          token: 'jwt-token',
        },
      };

      mockRabbitmqService.send.mockResolvedValue(mockResponse);

      const result = await service.login(loginDto);

      expect(rabbitmqService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          command: 'post:auth/login',
          data: loginDto,
        }),
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
