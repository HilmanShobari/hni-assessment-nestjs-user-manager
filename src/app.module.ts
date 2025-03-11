import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from 'src/modules/core/core.module';
import { CommonModule } from 'src/modules/common/common.module';

// Version 1
import { AuthModule as AuthModuleV1 } from 'src/modules/auth/auth.module';
import { UserModule as UserModuleV1 } from 'src/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    CommonModule,

    // Version 1
    AuthModuleV1,
    UserModuleV1,
  ],
})
export class AppModule {}
