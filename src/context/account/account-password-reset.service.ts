import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../../entity/account';
import { Repository } from 'typeorm';
import { decode, sign, verify } from 'jsonwebtoken';
import { hashPassword } from './password';
import { ResetPasswordMismatchError, UserDoesNotExistError } from './errors';

import { Permissions } from './permissions';

@Service()
export class AccountPasswordResetService {
  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  public async createJwt({ email }) {
    const payload = {
      email,
      permissions: [Permissions.USER_RESET_PASSWORD],
    };
    let user;

    try {
      user = await this.accountRepository.findOneOrFail({ email });
    } catch (e) {
      throw new UserDoesNotExistError();
    }

    return sign(payload, user.hashedPassword, {
      expiresIn: '7d',
    });
  }

  public async isJwtValid({ jwt }): Promise<boolean> {
    try {
      const { email } = decode(jwt);
      const user = await this.accountRepository.findOneOrFail({ email });

      verify(jwt, user.hashedPassword);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async resetPassword({ email, newPassword, newPasswordDuplicate }) {
    const user = await this.accountRepository.findOneOrFail({ email });
    if (!newPassword !== newPasswordDuplicate) {
      throw new ResetPasswordMismatchError();
    } else {
      return this.accountRepository.save({
        ...user,
        hashedPassword: await hashPassword({ password: newPassword }),
      });
    }
  }
}
