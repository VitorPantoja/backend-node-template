import { add } from 'date-fns';

import type { PayloadLogin, ResultSingInDto, SignInRequestDto } from './auth.dto';

import type { UserRepository } from '../../../domain/repositories/user.repository';
import { HttpException } from '../../../infrastructure/api/rest/utils/http-exceptions';
import type { JwtService } from '../../services/JwtService';

export class AuthSevice {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async login({ locale, parentId, personaId, userId }: PayloadLogin) {
    const token = await this.jwtService.generateToken({
      locale,
      parentId,
      personaId,
      userId
    });
    const days = this.jwtService.getExpireDays();

    // await this.personService.updateLastLoginDate(personId); //aqui atualiza a data de último login

    return { expiration: add(new Date(), { days }), locale, parentId, personaId, token };
  }

  async signIn({ email, locale, parentId, password, personaId }: SignInRequestDto): Promise<ResultSingInDto> {
    const person = await this.userRepository.findByEmail(email);
    if (!person) throw new HttpException('user_not_found', 404);
    // if (person.user?.statusId !== 1) throw new HttpException('user_inactive', 403);

    // tenta invalidar senha
    // const invalid = await this.invalidatePassword(person, password);
    // if (invalid) throw new HttpException(403, invalid);

    const result = await this.login({ locale, parentId, personaId, userId: person.id });

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

  async logout() {
    return 'logout';
  }
}
