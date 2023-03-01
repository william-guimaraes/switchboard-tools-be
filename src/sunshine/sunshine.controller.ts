import { Body, Controller, Post } from '@nestjs/common';
import { SunshineService } from './sunshine.service';

@Controller('sunshine')
export class SunshineController {
  constructor(private sunshineService: SunshineService) {}

  @Post('credentials')
  async credentials(
    @Body() payload: { keyId: string; keySecret: string },
  ): Promise<void> {
    this.sunshineService.setCredentials(payload.keyId, payload.keySecret);
  }

  @Post('app')
  async app(@Body() payload: { appId: string }): Promise<void> {
    this.sunshineService.setAppID(payload.appId);
  }
}
