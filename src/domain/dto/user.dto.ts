import { User } from "../entities/user";

export class UserDto {
  email!: string;
  password?: string;
  name!: string;
  age!: number;
  hashedPassword?: string;

  constructor(email: string, name: string, age: number, password?: string, hashedPassword?: string) {
    this.email = email;
    this.name = name;
    this.age = age;
    this.password = password;
    this.hashedPassword = hashedPassword;
  }

  static fromEntity(user: User): UserDto {
    const { name, email, age } = user;

    return new UserDto(email, name, age);
  }

  toEntity(): User {
    return new User(this.name, this.age, this.email, this.password, this.hashedPassword);
  }
}
