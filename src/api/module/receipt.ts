import { AxiosInstance, AxiosResponse } from "axios";
import { Receipt } from "../models";

export default function (instance: AxiosInstance): {
  getAll(): Promise<any>;
  get(id: number): Promise<any>;
  getByPage(page: number, perPage?: number): Promise<any>;
  add(receipt: Receipt): Promise<AxiosResponse<any, any>>;
  remove(id: number): Promise<any>;
  change(id: number, receipt: Receipt): Promise<any>;
} {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`receipts`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`receipt/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `receipts?page=${page}&per_page=${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(receipt: Receipt) {
      return await instance.post(`receipt`, receipt);
    },

    async remove(id: number) {
      return await instance.delete(`receipt/${id}`);
    },

    async change(id: number, receipt: Receipt) {
      return await instance.put(`receipt/${id}`, receipt);
    },
  };
}
