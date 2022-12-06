import { AxiosInstance, AxiosResponse } from "axios";
import { Expense } from "../models";

export default function (instance: AxiosInstance): {
  getAll(): Promise<any>;
  get(id: number): Promise<any>;
  getByPage(page: number, perPage?: number): Promise<any>;
  add(expense: Expense): Promise<AxiosResponse<any, any>>;
  remove(id: number): Promise<any>;
  change(id: number, expense: Expense): Promise<any>;
} {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`dispatchs`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`expense/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `dispatchs?page=${page}&per_page=${perPage}`;
      const { data } = await instance.get(url);
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
