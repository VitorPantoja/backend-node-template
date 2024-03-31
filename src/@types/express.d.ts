import type { PayloadTokenDto } from '../domain/dto/jwt.dto';

declare global {
  namespace Express {
    export interface Request {
      token?: PayloadTokenDto; // Defina o tipo de 'decoded' conforme necessário
    }
  }
}
