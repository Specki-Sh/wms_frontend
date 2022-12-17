import { AxiosInstance } from "axios";

export default function (instance: AxiosInstance) {
  return {
    async getAll() {
      const { data } = await instance.get(`warehouses`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`warehouse/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `warehouse/page/${page}/${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },
  };
}
