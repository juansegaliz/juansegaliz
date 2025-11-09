export interface ProjectFilter {
  year?: number;
  country?: string;
  type?: string;
  client?: string;
  query?: string;
}

export interface FilterOption {
  label: string;
  value: string | number;
  count?: number;
}

export interface ProjectFilters {
  years: FilterOption[];
  countries: FilterOption[];
  types: FilterOption[];
  clients: FilterOption[];
}
