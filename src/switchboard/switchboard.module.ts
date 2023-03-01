import { Module } from '@nestjs/common';
import { SwitchboardController } from './switchboard.controller';
import { ConversationModule } from 'src/conversation/conversation.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { SwitchboardService } from './switchboard.service';
import { SunshineModule } from 'src/sunshine/sunshine.module';

@Module({
  controllers: [SwitchboardController],
  imports: [ConversationModule, TicketModule, SunshineModule],
  providers: [SwitchboardService],
})
export class SwitchboardModule {}
