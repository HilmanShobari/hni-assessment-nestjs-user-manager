import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { RabbitmqService } from 'src/modules/core/rabbitmq/rabbitmq.service';

describe('UserService', () => {
  let service: UserService;
  const mockRabbit = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: RabbitmqService, useValue: mockRabbit },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send message for findAll', async () => {
    const mockData = { sender_email: 'test@mail.com' };
    const mockResponse = { data: { success: true, data: [] } };
    mockRabbit.send.mockResolvedValue(mockResponse);

    const result = await service.findAll(mockData);
    expect(mockRabbit.send).toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });

  it('should send message for create', async () => {
    const mockData = {
      sender_email: 'test@mail.com',
      name: 'Jane',
      email: 'jane@mail.com',
      password: 'secret',
      role: 1,
    };
    const mockResponse = { data: { success: true, data: mockData } };
    mockRabbit.send.mockResolvedValue(mockResponse);

    const result = await service.create(mockData);
    expect(mockRabbit.send).toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });

  it('should send message for findById', async () => {
    const mockData = { sender_email: 'test@mail.com', id: 1 };
    const mockResponse = { data: { success: true, data: mockData } };
    mockRabbit.send.mockResolvedValue(mockResponse);

    const result = await service.findById(mockData);
    expect(mockRabbit.send).toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });

  it('should send message for delete', async () => {
    const mockData = { sender_email: 'test@mail.com', id: 1 };
    const mockResponse = { data: { success: true } };
    mockRabbit.send.mockResolvedValue(mockResponse);

    const result = await service.delete(mockData);
    expect(mockRabbit.send).toHaveBeenCalled();
    expect(result).toEqual(mockResponse.data);
  });
});
