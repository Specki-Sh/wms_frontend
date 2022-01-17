import { AxiosInstance, AxiosResponse } from "axios";
import { Report } from "../models";

export default function (instance: AxiosInstance) {
  return {
    async get_by_date(range: { start: Date; end: Date }) {
      const { data } = await instance.post(`report/range/`, range);
      return data;
    },
  };
}
