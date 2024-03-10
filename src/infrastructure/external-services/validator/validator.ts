export interface IValidateResult<T> {
  isValid: boolean;
  message: string;
  data?: T;
}

export interface IDataValidator {
  validate: <T, S>(data: T, schema: S) => Promise<IValidateResult<T>>;
}
