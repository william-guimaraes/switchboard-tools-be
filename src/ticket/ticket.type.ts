export interface TicketSourceInterface {
  channel: string;
}

export interface TicketInterface {
  id: string;
  status: 'open' | 'solved' | 'closed';
  via: TicketSourceInterface;
}

export interface AuditBasicEventInterface {
  id: string;
  type: string;
}

export interface ChatStartedEventValueInterface
  extends AuditBasicEventInterface {
  conversation_id: string;
}

export interface ChatStartedEventInterface extends AuditBasicEventInterface {
  value: ChatStartedEventValueInterface;
}

export interface AuditsInterface {
  id: string;
  ticket_id: string;
  created_at: string;
  events: (AuditBasicEventInterface | ChatStartedEventInterface)[];
}
