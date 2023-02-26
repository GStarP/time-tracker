import { DataAccess } from "..";
import { SqliteDataAccessMatter } from "./matter";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const DB_NAME = "timeTracker";

export async function initSqliteDataAccess(): Promise<DataAccess> {
  // const db = SQLite.openDatabase(`db.${DB_NAME}`); // auto generate `.db` file
  const db = await openDatabaseFromFile();

  return {
    ...(await SqliteDataAccessMatter(db)),
  };
}

/**
 * open `SQLite.Database` from prepared `.db` file
 * SQLite will find database file in `/SQLite` directory
 */
const SQLITE_DIR_NAME = "SQLite";
async function openDatabaseFromFile(): Promise<SQLite.Database> {
  // create sqlite directory in mobile storage
  const sqlitePath = FileSystem.documentDirectory + SQLITE_DIR_NAME;
  if (!(await FileSystem.getInfoAsync(sqlitePath)).exists) {
    await FileSystem.makeDirectoryAsync(sqlitePath);
  }
  // asset => filesystem, then SQLite can read from it
  await FileSystem.downloadAsync(
    Asset.fromModule(require("./assets/timeTracker.db")).uri,
    `${sqlitePath}/${DB_NAME}.db`
  );
  return SQLite.openDatabase(`${DB_NAME}.db`);
}
