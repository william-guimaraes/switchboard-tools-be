export interface ActiveSwitchboardIntegration {
  id: string;
  name: string;
  integrationId: string;
  integrationType: string;
}

export interface ConversationInterface<T = any> {
  id: string;
  type: 'personal' | 'sdkGroup';
  metadata: T;
  activeSwitchboardIntegration: ActiveSwitchboardIntegration;
  isDefault: boolean;
  businessLastRead: string;
  lastUpdatedAt: string;
}

export interface ConversationResult {
  conversation: ConversationInterface;
}
