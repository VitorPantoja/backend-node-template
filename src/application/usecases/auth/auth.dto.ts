import type { LangType } from '../../../domain/dto/domain.dto';

export interface SignInRequestDto {
  email: string;
  password: string;
  personaId?: number; // depois criar um id para personas
  parentId?: number;
  locale?: LangType;
}

export interface ResultSingInDto {
  token: string;
  user: any; // poderia ser um person entity
  accessGroups: any; //poderia ser uma coleção de personas
  expiration?: Date;
  personaId: number; //id vigente para a persona logada
  parentId?: number;
}

export interface PayloadTokenDto {
  userId: number;
  personaId?: number;
  parentId?: number;
  locale?: string;
}

export interface PayloadLogin {
  userId: number;
  personaId?: number;
  parentId?: number;
  locale?: string;
}
