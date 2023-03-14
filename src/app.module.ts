import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';
import { ConversationModule } from './conversation/conversation.module';
import { SwitchboardModule } from './switchboard/switchboard.module';
import { SunshineModule } from './sunshine/sunshine.module';

@Module({
  imports: [
    TicketModule,
    ConversationModule,
    SwitchboardModule,
    SunshineModule,
  ],
})
export class AppModule {}
