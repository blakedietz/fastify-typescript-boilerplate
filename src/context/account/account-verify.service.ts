import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../../entity/account';
import { Repository } from 'typeorm';
import { decode, sign, verify } from 'jsonwebtoken';
import { Permissions } from './permissions';

@Service()
export class AccountVerifyService {
  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  public async createJwt({ email }) {
    const payload = {
      email,
      permissions: [Permissions.USER_VERIFY],
    };

    const user = await this.accountRepository.findOneOrFail({ email });

    return sign(payload, user.hashedPassword, {
      expiresIn: '7d',
    });
  }

  public async isValidJwt({ jwt }): Promise<boolean> {
    try {
      const { email, exp } = decode(jwt);
      const user = await this.accountRepository.findOneOrFail({ email });

      verify(jwt, user.hashedPassword);

      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  }

  public async verifyAccount({ email }): Promise<void> {
    const account = await this.accountRepository.findOneOrFail({ email });
    if (!account.isVerified) {
      await this.accountRepository.save({ ...account, isVerified: true });
    }
  }
}
