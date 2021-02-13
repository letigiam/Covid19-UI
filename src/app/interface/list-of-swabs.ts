export interface Swabs {
  swab_id: number;
  team_id: number;
  date: string;
  type: "rap" | "sier" | "mol";
  patient_id: number;
  done: boolean;
  positive_res: boolean;
}
