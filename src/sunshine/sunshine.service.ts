import { Injectable } from '@nestjs/common';
import SunshineConversationsClient from '../sunshine.client';

@Injectable()
export class SunshineService {
  private appID: string;
  private client: typeof SunshineConversationsClient;
  private defaultClient: any;

  constructor() {
    this.client = SunshineConversationsClient;
    this.defaultClient = this.client.ApiClient.instance;
  }

  setAppID(appID: string): void {
    this.appID = appID;
  }

  setCredentials(keyID: string, keySecret: string): void {
    const basicAuth = this.defaultClient.authentications['basicAuth'];
    basicAuth.username = keyID;
    basicAuth.password = keySecret;
  }

  getClient(): typeof SunshineConversationsClient {
    return this.client;
  }

  getAppID(): string {
    return this.appID;
  }
}
