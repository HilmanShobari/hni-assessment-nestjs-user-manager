import { Logger } from '@nestjs/common';

const requestLogger = new Logger('RequestLogger');

interface IRequestLogger {
  level: 'log' | 'error';
  ip: string;
  method: string;
  statusCode: number;
  originalUrl: string;
  responseTime: number;
}

export const requestLoggerService = (data: IRequestLogger): void => {
  requestLogger[data.level](
    `${data.ip}::${data.method}::${data.statusCode}::${data.originalUrl}::${data.responseTime}ms`,
  );
};
