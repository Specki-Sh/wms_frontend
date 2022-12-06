import { AxiosInstance } from "axios";
import { Supplier } from "../models";

export default function (instance: AxiosInstance) {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`suppliers`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`supplier/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `suppliers/page/${page}/${perPage}`;
      const { data } = await instance.get(url);
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
