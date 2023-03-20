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
            tx.executeSql(
              "SELECT * FROM matters ORDER BY sortNum ASC;",
              [],
              (_, resultSet) => {
                resolve(resultSet.rows._array);
              }
            );
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
              "INSERT INTO matters (matterName, matterColor, matterIcon, sortNum) VALUES (?, ?, ?, ?)",
              [
                matter.matterName,
                matter.matterColor,
                matter.matterIcon,
                matter.sortNum,
              ],
              () => resolve()
            );
          },
          (e) => reject(e)
        );
      });
    }

    function updateMatter(matter: Matter): Promise<void> {
      return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              "UPDATE matters SET matterName = (?), matterColor = (?), matterIcon = (?), sortNum = (?) WHERE matterId = (?)",
              [
                matter.matterName,
                matter.matterColor,
                matter.matterIcon,
                matter.sortNum,
                matter.matterId,
              ],
              () => resolve()
            );
          },
          (e) => reject(e)
        );
      });
    }

    function updateMatterOrder(matters: Matter[]): Promise<void> {
      return new Promise((resolve, reject) => {
        db.transaction(
          (tx) => {
            const totalNum = matters.length;

            let resolveNum = 0;
            const singleUpdateResolve = () => {
              resolveNum++;
              if (resolveNum === totalNum) {
                resolve();
              }
            };

            for (let i = 0; i < totalNum; ++i) {
              const matter = matters[i];
              tx.executeSql(
                "UPDATE matters SET matterName = (?), matterColor = (?), matterIcon = (?), sortNum = (?) WHERE matterId = (?)",
                [
                  matter.matterName,
                  matter.matterColor,
                  matter.matterIcon,
                  matter.sortNum,
                  matter.matterId,
                ],
                singleUpdateResolve
              );
            }
          },
          (e) => reject(e)
        );
      });
    }

    /**
     * create table `matter` if not exists
     */
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS matters (matterId INT PRIMARY KEY AUTOINCREMENT, matterName TEXT, matterColor INT, matterIcon INT, sortNum INT);"
        );
      },
      (e) => {
        reject(e);
      },
      () => {
        resolve({
          getAllMatter,
          insertMatter,
          updateMatter,
          updateMatterOrder,
        });
      }
    );
  });
}
