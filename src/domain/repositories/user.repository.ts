import type { Repository } from 'typeorm';
import type { DataSourceService } from '../../infrastructure/datasource';
import { User } from '../entities/user';

export class UserRepository {
  private userRepository: Repository<User>;
  constructor(private readonly dataSource: DataSourceService) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async create(user: User) {
    const userToCreate = this.userRepository.create(user);
    return await this.userRepository.save(userToCreate);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const result = await this.userRepository.delete({ id });
    return result;
  }

  async findAll() {
    const result = await this.userRepository.find();
    console.log(result);
    return result;
  }

  async update(id: number, user: User) {
    return await this.userRepository.update({ id }, user);
  }

  async store(id: number, user: User) {
    const userExists = await this.findById(id);
    if (userExists) {
      const updated = await this.update(id, user);
      return updated ? { ...userExists, ...user } : null;
    }
    return this.create(user);
  }
}
