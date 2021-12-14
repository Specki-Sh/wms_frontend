import { AxiosInstance } from "axios";
import { Supplier } from "../models";

export default function (instance: AxiosInstance) {
  return {
    async getAll() {
      const { data } = await instance.get(`suppliers`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`supplier/${id}`);
      return data;
    },

    async add(supplier: Supplier) {
      return await instance.post(`supplier`, supplier);
    },

    async remove(id: number) {
      return await instance.delete(`supplier/${id}`);
    },

    async change(id: number, supplier: Supplier) {
      return await instance.put(`supplier/${id}`, supplier);
    },
  };
}
