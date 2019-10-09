import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../../entity/account';
import { Repository } from 'typeorm';
import { hashPassword } from './password';

@Service()
export class AccountSignUpService {
  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  public async create({ userName, password, email }) {
    const newAccountParams = new Account();
    newAccountParams.userName = userName;
    newAccountParams.email = email;
    newAccountParams.hashedPassword = await hashPassword({
      password,
    });
    try {
      return await this.accountRepository.save(newAccountParams);
    } catch (e) {
      // TODO: (bdietz) - in a scenario where the user email already exists
      //  we need to swallow the error and act none the wiser. this is for
      //  owasp security constraints
      //  read more about that here: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    }
  }
}
