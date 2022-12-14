import { Goods } from "@/api/models";

export type goods_document = {
  document_number: number;
  contractor: {
    id: number;
  };
  date: Date;
  products: Array<Goods>
}