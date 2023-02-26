import { DataAccess } from "..";
import { SqliteDataAccessMatter } from "./matter";
import * as SQLite from "expo-sqlite";

const DB_NAME = "timeTracker";

export async function initSqliteDataAccess(): Promise<DataAccess> {
  const db = SQLite.openDatabase(`db.${DB_NAME}`);

  return {
    ...(await SqliteDataAccessMatter(db)),
  };
}
