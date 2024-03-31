import { dataSource } from '../../application/services/datasource.service';

import { UserRepository } from './user.repository';

const userRepository = new UserRepository(dataSource);

export { userRepository };
