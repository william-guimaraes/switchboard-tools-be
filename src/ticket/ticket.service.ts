import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { TicketInterface, AuditsInterface } from './ticket.type';

@Injectable()
export class TicketService {
  private baseURL: string;

  constructor(private readonly httpService: HttpService) {}

  setBaseURL(subdomain: string): void {
    this.baseURL = `https://${subdomain}.zendesk.com/api/v2/tickets`;
  }

  setCredentials(keyID: string, keySecret: string): void {
    this.httpService.axiosRef.interceptors.request.use(
      async (config) => {
        const basicAuthCredentials = Buffer.from(
          keyID + '/token:' + keySecret,
        ).toString('base64');

        config.headers['Authorization'] = 'Basic ' + basicAuthCredentials;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async findAll(
    page: number,
  ): Promise<AxiosResponse<{ tickets: TicketInterface[]; next_page: string }>> {
    return this.httpService.axiosRef.get(
      `${this.baseURL}?page=${page}&sort_by=created_at&sort_order=desc`,
    );
  }

  async findById(
    id: string,
  ): Promise<AxiosResponse<{ ticket: TicketInterface }>> {
    return this.httpService.axiosRef.get(`${this.baseURL}/${id}`);
  }

  async findAudits(
    id: string,
  ): Promise<AxiosResponse<{ audits: AuditsInterface[] }>> {
    return this.httpService.axiosRef.get(`${this.baseURL}/${id}/audits`);
  }
}
