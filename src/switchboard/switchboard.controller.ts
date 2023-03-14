import { Controller, Post, InternalServerErrorException } from '@nestjs/common';
import { TicketService } from 'src/ticket/ticket.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { SwitchboardService } from './switchboard.service';
import { getConversationIdFromAudits } from './switchboard.utils';
import { TicketInterface } from 'src/ticket/ticket.type';

@Controller('switchboard')
export class SwitchboardController {
  constructor(
    private ticketService: TicketService,
    private conversationService: ConversationService,
    private switchboardService: SwitchboardService,
  ) {}

  @Post('apply-changes')
  async applyChanges(): Promise<void> {
    const targetIntegrationId =
      await this.switchboardService.getDefaultSwitchboardIntegration();

    let nextPage = 1;
    while (nextPage) {
      const ticketsResult = await this.ticketService.findAll(nextPage);
      await this.changeTickets(targetIntegrationId, ticketsResult.data.tickets);
      nextPage = ticketsResult.data.next_page ? nextPage + 1 : null;
    }
  }

  async changeTickets(
    targetIntegrationId: string,
    tickets: TicketInterface[],
  ): Promise<void> {
    try {
      for (const ticket of tickets) {
        const ticketResult = await this.ticketService.findById(ticket.id);
        const ticketStatus = ticketResult.data.ticket.status;
        const ticketSource = ticketResult.data.ticket.via.channel;

        if (ticketSource !== 'native_messaging' || ticketStatus !== 'closed') {
          continue;
        }

        const ticketAuditsResult = await this.ticketService.findAudits(
          ticket.id,
        );
        const audits = ticketAuditsResult.data.audits;
        const conversationId = getConversationIdFromAudits(audits);
        const conversationResult = await this.conversationService.findById(
          conversationId,
        );
        const activeSwitchboardIntegration =
          conversationResult.conversation.activeSwitchboardIntegration
            .integrationType;

        if (activeSwitchboardIntegration === 'zd:agentWorkspace') {
          await this.switchboardService.passControl({
            conversationId,
            integrationId: targetIntegrationId,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
