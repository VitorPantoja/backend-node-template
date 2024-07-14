import type { PayloadTokenDto } from "../application/usecases/auth/auth.dto";


declare global {
  namespace Express {
    export interface Request {
      auth?: PayloadTokenDto; // Defina o tipo de 'decoded' conforme necessário
    }
  }
}
