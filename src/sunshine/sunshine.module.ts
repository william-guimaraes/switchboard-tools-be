import { Module } from '@nestjs/common';
import { SunshineService } from './sunshine.service';
import { SunshineController } from './sunshine.controller';

@Module({
  providers: [SunshineService],
  controllers: [SunshineController],
  exports: [SunshineService],
})
export class SunshineModule {}
