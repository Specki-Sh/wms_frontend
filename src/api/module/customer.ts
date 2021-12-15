import { AxiosInstance } from "axios";
import { Customer } from "../models";

export default function (instance: AxiosInstance) {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`customers`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`customer/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `customers?page=${page}&per_page=${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(customer: Customer) {
      return await instance.post(`customer`, customer);
    },

    async remove(id: number) {
      return await instance.delete(`customer/${id}`);
    },

    async change(id: number, customer: Customer) {
      return await instance.put(`customer/${id}`, customer);
    },
  };
}
