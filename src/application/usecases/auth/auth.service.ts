import { compare } from 'bcryptjs';
import { add } from 'date-fns';
import type { DeepPartial } from 'typeorm';

import type { PayloadLogin, ResultSingInDto, SignInRequestDto } from './auth.dto';

import type { User } from '../../../domain/entities/user';
import type { UserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundError, UnauthorizedError } from '../../../infrastructure/api/rest/utils/http-exceptions';
import { LogClass } from '../../../infrastructure/server/logger/log-class.decorator';
import { ErrMsg } from '../../../infrastructure/server/middlewares/http-exception';
import type { JwtService } from '../../services/JwtService';
import { generateHashPassword2, hashPassword } from '../user/user.helper';

@LogClass
export class AuthSevice {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async login({ locale, parentId, personaId, userId }: PayloadLogin) {
    const token = await this.jwtService.generateToken({
      locale,
      parentId: parentId ?? 0,
      personaId,
      userId
    });
    const days = this.jwtService.getExpireDays();

    // await this.personService.updateLastLoginDate(personId); //aqui atualiza a data de último login

    return { expiration: add(new Date(), { days }), locale, parentId, personaId, token };
  }

  async signIn({ email, locale, parentId, password, personaId }: SignInRequestDto): Promise<ResultSingInDto> {
    const person = await this.userRepository.findByEmail(email);
    if (!person) throw new NotFoundError('user_not_found');

    // if (person.user?.statusId !== 1) throw new HttpException('user_inactive', 403);

    // tenta invalidar senha
    const invalid = await this.invalidatePassword(person, password);
    if (invalid) {
      throw new UnauthorizedError(ErrMsg.invalidCredentials);
    }

    const result = await this.login({ locale: 'pt-br', parentId: 0, personaId, userId: person.id });

    // const payload = { parentId: result?.parentId, personaId, user: { id: person.id, name: person.name } };

    // Utils.TerminalLogger.log(
    //   `
    //   Login de usuário ${email}
    //   ${payload}
    //   createdBy: ${person?.id}
    //   `,
    //   { level: 'INFO', scope: 'auth' }
    // );
    // criar um log de evento
    // expiration = null, parentId, role, token = '', user = null
    return {
      ...result,
      accessGroups: [],
      parentId,
      personaId: personaId as number,
      token: result.token,
      user: {
        parentId
      }
    };
  }

  async invalidatePassword(person: DeepPartial<User>, password: string): Promise<ErrMsg | null> {
    if (!password || !person?.password) throw new UnauthorizedError(ErrMsg.invalidCredentials);

    if (!person?.hashedPassword) {
      // const oldPasswordHash = createHash('md5').update(`${password}${person.salt}`).digest('hex');
      const oldPasswordHash2 = hashPassword(person.password, person.salt as string);
      if (person?.password !== oldPasswordHash2) throw new UnauthorizedError(ErrMsg.invalidCredentials);
      const updatedHashedPassword = await generateHashPassword2(password);
      await this.userRepository.update(person.id as number, { hashedPassword: updatedHashedPassword });
    } else {
      const matched = await compare(password, person.hashedPassword);
      if (!matched) throw new UnauthorizedError(ErrMsg.invalidCredentials);
    }
    return null;
  }

  async testSignin() {
    return this.jwtService.testToken();
  }

  async logout() {
    return 'logout';
  }
}
