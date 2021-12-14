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
  };
}
