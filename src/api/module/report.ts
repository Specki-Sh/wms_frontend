import { AxiosInstance, AxiosResponse } from "axios";
import { Report } from "../models";

export default function (instance: AxiosInstance) {
  return {
    async get_by_date(range: { _from: string; till: string }) {
      const { data } = await instance.post(`/document/material_report`, range);
      return data;
    },
  };
}
