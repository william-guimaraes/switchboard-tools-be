import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { SunshineModule } from 'src/sunshine/sunshine.module';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
  imports: [SunshineModule],
})
export class ConversationModule {}
