export interface ServerCost {
  id: string;
  name: string;
  provider: string;
  monthly_cost: string;
  total_cost?: string;
  start_date: string;
  months_running?: number;
  [key: string]: string | number | undefined;
}
