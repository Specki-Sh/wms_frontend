import { AxiosInstance } from "axios";
import { Receipt } from "../models";

export default function (instance: AxiosInstance) {
  return {
    async getAll() {
      const { data } = await instance.get(`receipts`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`receipt/${id}`);
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
