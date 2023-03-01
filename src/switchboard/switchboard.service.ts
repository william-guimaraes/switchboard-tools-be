import { Injectable } from '@nestjs/common';
import { PassControlDTO } from './switchboard.type';
import { SunshineService } from 'src/sunshine/sunshine.service';

@Injectable()
export class SwitchboardService {
  private switchboard: any;
  private switchboardActions: any;

  constructor(private sunshineClient: SunshineService) {
    const client = this.sunshineClient.getClient();
    this.switchboard = new client.SwitchboardsApi();
    this.switchboardActions = new client.SwitchboardActionsApi();
  }

  async getDefaultSwitchboardIntegration(): Promise<any> {
    const appId = this.sunshineClient.getAppID();
    const switchboardData = await this.switchboard.listSwitchboards(appId);
    const defaultSwitchboardIntegration =
      switchboardData.switchboards[0].defaultSwitchboardIntegrationId;
    return defaultSwitchboardIntegration;
  }

  async passControl({
    conversationId,
    integrationId,
    metadata,
  }: PassControlDTO): Promise<any> {
    const appId = this.sunshineClient.getAppID();
    return this.switchboardActions.passControl(appId, conversationId, {
      switchboardIntegration: integrationId,
      metadata,
    });
  }
}
