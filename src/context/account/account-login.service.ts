import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../../entity/account';
import { Repository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken';
import { comparePasswordHash } from './password';

@Service()
export class AccountLoginService {
  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  public async createJwt({ email, password }) {
    const payload = {
      email,
      permissions: [],
    };
    let user;

    try {
      user = await this.accountRepository.findOneOrFail({ email });
    } catch (e) {
      throw new Error('The user has supplied an incorrect email or password.');
    }

    const passwordIsCorrect = await comparePasswordHash({
      clearTextPassword: password,
      hashedPassword: user.hashedPassword,
    });

    if (!passwordIsCorrect) {
      throw new Error('The user has supplied an incorrect email or password.');
    }

    return sign(payload, process.env.PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: '1d',
    });
  }

  public static isValidJwt({ jwt }): boolean {
    try {
      // verify returns the token or throws
      verify(jwt, process.env.PUBLIC_KEY, {
        algorithms: ['RS256'],
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
