import { AxiosInstance, AxiosResponse } from "axios";
import { ProductInfo as IProductInfo, ProductCard as IProductCard } from "../models";

export default function (instance: AxiosInstance): {
  getAll(): Promise<any>;
  get(id: number): Promise<any>;
  getByPage(page: number, perPage?: number): Promise<any>;
  add(product: IProductInfo): Promise<AxiosResponse<any, any>>;
  remove(id: number): Promise<any>;
  change(id: number, product: IProductCard): Promise<any>;
} {
  return {
    async getAll() {
      const { data } = await instance.get(`products`);
      return data;
    },

    async get(id: number) {
      const { data } = await instance.get(`product/${id}`);
      return data;
    },

    async getByPage(page: number, perPage = 15) {
      const url = `products/page/${page}/${perPage}`;
      const { data } = await instance.get(url);
      return data;
    },

    async add(product: IProductInfo) {
      return await instance.post(`product`, product);
    },

    async remove(id: number) {
      return await instance.delete(`product/${id}`);
    },

    async change(id: number, product: IProductCard) {
      return await instance.put(`product/${id}`, product);
    },
  };
}
