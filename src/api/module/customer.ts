import { AxiosInstance } from "axios";
import { Customer } from "../models";

export default function (instance: AxiosInstance) {
  return {
    async getAll() {
      const { data } = await instance.get(`customers`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`customerzzzzz/${id}`);
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
