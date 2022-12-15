import { AxiosInstance, AxiosResponse } from "axios";
import { ExpenseDocument as IExpenseDocument } from "../models";

export default function (instance: AxiosInstance): {
  getAll(): Promise<any>;
  get(id: number): Promise<any>;
  getByPage(page: number, perPage?: number): Promise<any>;
  add(expense: IExpenseDocument): Promise<AxiosResponse<any, any>>;
  remove(id: number): Promise<any>;
  change(id: number, expense: IExpenseDocument): Promise<any>;
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
      const url = `document/expense/info/page/${page}/${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(expense: IExpenseDocument) {
      return await instance.post(`document/expense`, expense);
    },

    async remove(document_number: number) {
      return await instance.delete(`document/expense/number/${document_number}`);
    },

    async change(id: number, expense: IExpenseDocument) {
      return await instance.put(`expense/${id}`, expense);
    },
  };
}
