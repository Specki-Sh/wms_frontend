import { AxiosInstance, AxiosResponse } from "axios";
import { Dispatch } from "../models";

export default function (instance: AxiosInstance): {
  getAll(): Promise<any>;
  get(id: number): Promise<any>;
  getByPage(page: number, perPage?: number): Promise<any>;
  add(dispatch: Dispatch): Promise<AxiosResponse<any, any>>;
  remove(id: number): Promise<any>;
  change(id: number, dispatch: Dispatch): Promise<any>;
} {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`dispatchs`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`dispatch/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `dispatchs?page=${page}&per_page=${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(dispatch: Dispatch) {
      return await instance.post(`dispatch`, dispatch);
    },

    async remove(id: number) {
      return await instance.delete(`dispatch/${id}`);
    },

    async change(id: number, dispatch: Dispatch) {
      return await instance.put(`dispatch/${id}`, dispatch);
    },
  };
}
