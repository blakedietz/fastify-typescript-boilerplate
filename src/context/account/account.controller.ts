import { Service, Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Account } from '../../entity/account';
import { Repository } from 'typeorm';
import { AccountLoginService } from './account-login.service';
import { AccountPasswordResetService } from './account-password-reset.service';
import { AccountSignUpService } from './account-sign-up.service';
import { AccountVerifyService } from './account-verify.service';
import { sendEmail } from '../user-notifications/email';

@Service()
export class AccountController {
  @Inject()
  private accountLoginService: AccountLoginService;
  @Inject()
  private accountPasswordResetService: AccountPasswordResetService;
  @Inject()
  private accountSignUpService: AccountSignUpService;
  @Inject()
  private accountVerifyService: AccountVerifyService;

  @InjectRepository(Account)
  private accountRepository: Repository<Account>;

  public async create({ email, userName, password }) {
    const newAccount = await this.accountSignUpService.create({
      email,
      userName,
      password,
    });

    // If the account is not created don't send the email.
    if (newAccount) {
      await this.sendVerificationEmail({ email });
    }
    return newAccount;
  }

  public async sendVerificationEmail({ email }) {
    await this.accountRepository.findOneOrFail({ email });

    const emailToken = await this.accountVerifyService.createJwt({ email });

    // TODO: (bdietz) - offload this to an non main thread task
    await sendEmail({
      email,
      subject: 'Verify your account.',
      text: `Thanks for signing up please verify your account by visiting http://localhost:3000/account/verify?token=${emailToken}`,
    });
  }

  public async login({ email, password }) {}

  public async resetPassword({ email, newPassword, newPasswordDuplicate }) {}

  public async verify({ email }): Promise<void> {
    await this.accountVerifyService.verifyAccount({ email });
  }

  public async getAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }
}
