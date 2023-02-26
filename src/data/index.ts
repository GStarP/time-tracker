import { DataAccessMatter } from "./matter";
import { initSqliteDataAccess } from "./sqlite";

export type DataAccess = DataAccessMatter;

let da: DataAccess | null = null;
export function DA() {
  if (da === null) {
    throw new Error("havn't use any data access impl.");
  }
  return da;
}

export async function useSqliteDataAccess() {
  da = await initSqliteDataAccess();
}
