import { Body, Controller, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post('subdomain')
  async subdomain(@Body() payload: { subdomain: string }): Promise<void> {
    this.ticketService.setBaseURL(payload.subdomain);
  }

  @Post('credentials')
  async credentials(
    @Body() payload: { keyId: string; keySecret: string },
  ): Promise<void> {
    this.ticketService.setCredentials(payload.keyId, payload.keySecret);
  }
}
