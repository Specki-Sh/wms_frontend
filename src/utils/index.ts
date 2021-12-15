import { Warehouse, Receipt, Expense } from "@/api/models";
type arrayDBModels = Array<Warehouse> | Array<Receipt> | Array<Expense>;

export function addNameById(objArr: arrayDBModels): void {
  for (const obj of objArr) {
    for (const key in obj) {
      const idx = key.indexOf("_id");
      if (idx != -1) {
        const str = key.substr(0, idx);
        getName(Number(obj[key]), str).then(
          (result) => (obj[str] = result.name)
        );
      }
    }
  }
}

export function isTable(str: string): boolean {
  const tableArray = [
    "product",
    "customer",
    "supplier",
    "receipt",
    "expense",
    "warehouse",
  ];
  return tableArray.includes(str);
}

import api from "@/api/index";
async function getName(id: number, str: string) {
  return await api[str].get(id);
}
