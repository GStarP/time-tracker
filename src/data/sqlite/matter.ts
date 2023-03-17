import { DataAccessMatter, Matter } from "../matter";
import SQLite from "expo-sqlite";

export function SqliteDataAccessMatter(
  db: SQLite.Database
): Promise<DataAccessMatter> {
  return new Promise((resolve, reject) => {
    /**
     * interfaces
     */
    function getAllMatter(): Promise<Matter[]> {
      return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql("select * from matters;", [], (_, resultSet) => {
              resolve(resultSet.rows._array);
            });
          },
          (e) => reject(e)
        );
      });
    }

    function insertMatter(matter: Matter): Promise<void> {
      return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "insert into matters (matterName, matterColor, matterIcon) values (?, ?, ?)",
              [matter.matterName, matter.matterColor, matter.matterIcon],
              () => resolve()
            );
          },
          (e) => reject(e)
        );
      });
    }

    // create table `matter` if not exists
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists matters (matterId integer primary key autoincrement, matterName text, matterColor integer, matterIcon integer);"
        );
        // @TEST
        // tx.executeSql(
        //   "insert into matters (matterName, matterColor, matterIcon) values (?, ?, ?)",
        //   ["学习", 0, 0]
        // );
      },
      (e) => {
        reject(e);
      },
      () => {
        resolve({
          getAllMatter,
          insertMatter,
        });
      }
    );
  });
}
