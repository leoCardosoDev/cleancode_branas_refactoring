import axios from "axios";
import HttpClient from "./http_client";

export default class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url)
    return response.data
  }
  async post(url: string, body: any): Promise<any> {
    const response = await axios.post(url, body)
    return response.data
  }
}
