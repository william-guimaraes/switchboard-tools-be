import { Controller, Post, InternalServerErrorException } from '@nestjs/common';
import { TicketService } from 'src/ticket/ticket.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { SwitchboardService } from './switchboard.service';
import { getConversationIdFromAudits } from './switchboard.utils';

@Controller('switchboard')
export class SwitchboardController {
  constructor(
    private ticketService: TicketService,
    private conversationService: ConversationService,
    private switchboardService: SwitchboardService,
  ) {}

  @Post('apply-changes')
  async applyChanges(): Promise<void> {
    try {
      const targetIntegrationId =
        await this.switchboardService.getDefaultSwitchboardIntegration();
      const ticketsResult = await this.ticketService.findAll();

      for (const ticket of ticketsResult.data.tickets) {
        const ticketResult = await this.ticketService.findById(ticket.id);

        if (ticketResult.data.ticket.status === 'closed') {
          const ticketAuditsResult = await this.ticketService.findAudits(
            ticket.id,
          );
          const audits = ticketAuditsResult.data.audits;
          const conversationId = getConversationIdFromAudits(audits);
          const conversationResult = await this.conversationService.findById(
            conversationId,
          );
          const activeSwitchboardIntegration =
            conversationResult.conversation.activeSwitchboardIntegration.name;

          if (activeSwitchboardIntegration === 'zd:agentWorkspace') {
            await this.switchboardService.passControl({
              conversationId,
              integrationId: targetIntegrationId,
            });
          }
        }
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
