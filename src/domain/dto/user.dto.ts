import { User } from '../entities/user';

export class UserDto {
  email!: string;
  password?: string;
  name!: string;
  age!: number;

  constructor(email: string, name: string, age: number) {
    this.email = email;
    this.name = name;
    this.age = age;
  }

  static fromEntity(user: User): UserDto {
    const { name, email, age } = user;

    return new UserDto(email, name, age);
  }

  toEntity(): User {
    return new User(this.name, this.age, this.email);
  }
}
