import { v4 as uuidV4 } from 'uuid';

import { generateHashPassword, generateHashPassword2, hashPassword } from './user.helper';

import { UserDto } from '../../../domain/dto/user.dto';
import { nonNull } from '../../../domain/helper';
import { type UserRepository } from '../../../domain/repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserDto) {
    const data = new UserDto(user.email, user.name, user.age, user?.password);
    if (nonNull(user.password)) {
      const hash = await generateHashPassword2(user.password);
      const salt = uuidV4();
      const password = hashPassword(hash, salt);
      data.salt = salt;
      data.password = password;
      data.hashedPassword = hash;
    }
    return await this.userRepository.create(data.toEntity());
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  async findAll() {
    const result = await this.userRepository.findAll();
    return result;
  }
}
