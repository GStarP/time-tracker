export interface Matter {
  matterId: number;
  matterName: string;
  matterColor: number;
  matterIcon: number;
  sortNum: number;
}

export interface DataAccessMatter {
  /**
   * get all matters (sorted)
   */
  getAllMatter: () => Promise<Matter[]>;
  insertMatter: (matter: Matter) => Promise<void>;
  updateMatter: (matter: Matter) => Promise<void>;
  updateMatterOrder: (matters: Matter[]) => Promise<void>;
  deleteMatter: (matterId: number) => Promise<void>;
}
