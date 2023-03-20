import { DA } from "../../data";
import { Matter } from "../../data/matter";

const STEP = 256;

/**
 * sortNum advance by 2^8 from 0
 */
export function getNewMatterSortNum(matters: Matter[]) {
  return matters.length === 0 ? 0 : matters[matters.length - 1].sortNum + STEP;
}

/**
 * @param mattersToUpdate data which sortNum is not up-to-date
 * @param resortedIndex item index which just be resorted
 */
export function updateSortNum(
  mattersToUpdate: Matter[],
  resortedIndex: number
) {
  // one item cannot trigger resort
  if (mattersToUpdate.length <= 1) return;

  const len = mattersToUpdate.length;
  let mattersToPersist = [mattersToUpdate[resortedIndex]];

  // resort to head
  if (resortedIndex === 0) {
    mattersToUpdate[0].sortNum = mattersToUpdate[1].sortNum - STEP;
  }
  // resort to tail
  else if (resortedIndex === len - 1) {
    mattersToUpdate[len - 1].sortNum = mattersToUpdate[len - 2].sortNum + STEP;
  }
  // resort between two items
  else {
    const preSortNum = mattersToUpdate[resortedIndex - 1].sortNum;
    const proSortNum = mattersToUpdate[resortedIndex + 1].sortNum;
    const curSortNum = Math.ceil((preSortNum + proSortNum) / 2);
    // conflict, recompute all sortNum
    if (curSortNum === preSortNum || curSortNum === proSortNum) {
      mattersToUpdate.forEach((item, index) => (item.sortNum = index * STEP));
      // all matter need to be persisted
      mattersToPersist = mattersToUpdate;
    } else {
      // not conflict, just update
      mattersToUpdate[resortedIndex].sortNum = curSortNum;
    }
  }

  // persist changes to database
  DA().updateMatterOrder(mattersToPersist);
}
