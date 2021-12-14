import { AxiosInstance } from "axios";
import { Expense } from "../models";

export default function (instance: AxiosInstance) {
  return {
    async getAll() {
      const { data } = await instance.get(`expenses`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`expense/${id}`);
      return data;
    },

    async add(expense: Expense) {
      return await instance.post(`expense`, expense);
    },

    async remove(id: number) {
      return await instance.delete(`expense/${id}`);
    },

    async change(id: number, expense: Expense) {
      return await instance.put(`expense/${id}`, expense);
    },
  };
}
