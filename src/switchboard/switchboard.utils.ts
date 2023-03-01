import {
  AuditsInterface,
  ChatStartedEventInterface,
} from '../ticket/ticket.type';

export const getConversationIdFromAudits = (audits: AuditsInterface[]) => {
  for (const event of audits[0].events) {
    if (event.type === 'ChatStartedEvent') {
      return (event as ChatStartedEventInterface).value.conversation_id;
    }
  }
};
