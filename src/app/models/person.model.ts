export interface Person {
  uuid: string;
  name: string;
  dateOfBirth: string;
  score: number;
  salary: number;
  active: boolean;
  comment: string | null;
}

export interface UpdatePersonDto {
  name?: string;
  salary?: number;
  comment?: string;
}

export interface CreatePersonDto {
  name: string;
  dateOfBirth: string;
  score: number;
  salary: number;
  active: boolean;
  comment?: string | null;
}

export interface PersonResponse {
  requestId: string;
}

