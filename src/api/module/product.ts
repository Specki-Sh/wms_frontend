import { AxiosInstance } from "axios";
import { Product } from "../models";

export default function (instance: AxiosInstance) {
  return {
    // change it, for now it takes only 10 items by first page
    async getAll() {
      const { data } = await instance.get(`products`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`product/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `products?page=${page}&per_page=${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(product: Product) {
      return await instance.post(`product`, product);
    },

    async remove(id: number) {
      return await instance.delete(`product/${id}`);
    },

    async change(id: number, product: Product) {
      return await instance.put(`product/${id}`, product);
    },
  };
}
