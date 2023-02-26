export interface Matter {
  matterId: number;
  matterName: string;
  matterColor: number;
  matterIcon: number;
}

export interface DataAccessMatter {
  getAllMatter: () => Promise<Matter[]>;
}
