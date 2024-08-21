import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinanceModule } from './finance/finance.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [FinanceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
