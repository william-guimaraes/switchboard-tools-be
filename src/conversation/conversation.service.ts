import { Injectable } from '@nestjs/common';
import { ConversationResult } from './conversation.type';
import { SunshineService } from 'src/sunshine/sunshine.service';

@Injectable()
export class ConversationService {
  private appID: string;
  private conversationInstance: any;

  constructor(private sunshineClient: SunshineService) {
    const client = this.sunshineClient.getClient();
    this.conversationInstance = new client.ConversationsApi();
    this.appID = this.sunshineClient.getAppID();
  }

  async findById(id: string): Promise<ConversationResult> {
    this.appID = this.sunshineClient.getAppID();
    return this.conversationInstance.getConversation(this.appID, id);
  }
}
