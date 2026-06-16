export interface Trip {
  title: string;
  destination: string;
  country: string;
  startDate: Date;
  endDate: Date;
  category?: string;
  budget?: number;
  status?: string;
  notes?: string;
}
