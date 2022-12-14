import { AxiosInstance, AxiosResponse } from "axios";
import { Acceptance } from "../models";

export default function (instance: AxiosInstance): {
  getAll(): Promise<any>;
  get(id: number): Promise<any>;
  getByPage(page: number, perPage?: number): Promise<any>;
  add(acceptance: Acceptance): Promise<AxiosResponse<any, any>>;
  remove(id: number): Promise<any>;
  change(id: number, acceptance: Acceptance): Promise<any>;
} {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`acceptances`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`acceptance/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `document/acceptance/info/page/${page}/${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(acceptance: Acceptance) {
      return await instance.post(`document/acceptance`, acceptance);
    },

    async remove(document_number: number) {
      return await instance.delete(`document/acceptance/number/${document_number}`);
    },

    async change(id: number, acceptance: Acceptance) {
      return await instance.put(`acceptance/${id}`, acceptance);
    },
  };
}
