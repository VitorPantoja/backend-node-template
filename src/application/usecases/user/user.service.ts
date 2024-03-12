import { UserDto } from '../../../domain/dto/user.dto';
import { nonNull } from '../../../domain/helper';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { generateHashPassword, hashPassword } from './user.helper';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserDto) {
    const data = new UserDto(user.email, user.name, user.age, user?.password);
    if (nonNull(user.password)) {
      const hash = await generateHashPassword(user.password);
      const password = hashPassword(hash);
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
