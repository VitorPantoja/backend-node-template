import { UserDto } from '../../../domain/dto/user.dto';
import { UserRepository } from '../../../domain/repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserDto) {
    const data = new UserDto(user.email, user.name, user.age);
    return await this.userRepository.create(data.toEntity());
  }

  async findAll() {
    const result = await this.userRepository.findAll();
    return result;
  }
}
