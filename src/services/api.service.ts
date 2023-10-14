import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    });
  }

  private async request<T>(
    method: string,
    url: string,
    data: any = null,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request({
        method,
        url,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('GET', url, null, config);
  }

  async post<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async patch<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('DELETE', url, null, config);
  }
}

export default ApiService;
