export interface Swab {
  swab_id: number;
  team_id: number;
  date: string;
  type: 'rap' | 'sier' | 'mol';
  done: boolean;
  positive_res: boolean;
  name: string;
  phone: string;
  address: string;
}
export interface SwabCalendar {
  date: {
    swabs: Swab[];
  };
}
