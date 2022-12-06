export interface IListPetsParams {
  page: number;
  perPage: number;
  name?: string;
  gender?: string;
  birthRange?: { min: string; max: string };
  castrated?: boolean;
  vaccinated?: boolean;
  fiv?: boolean;
  felv?: boolean;
  status?: string;
}

export interface IRequestListPetsParams {
  page: string;
  perPage: string;
  name?: string;
  gender?: string;
  ageRange?: string;
  castrated?: string;
  vaccinated?: string;
  fiv?: string;
  felv?: string;
  status?: string;
}
