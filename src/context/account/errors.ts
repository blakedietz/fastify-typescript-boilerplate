// Good list of status codes: https://www.restapitutorial.com/httpstatuscodes.html
export class InvalidTokenError extends Error {
  private statusCode: number;
  constructor(message = 'The token you provided was not valid.') {
    super(message);
    this.statusCode = 401;
    this.name = 'InvalidTokenError';
  }
}

export class NoAuthorizationHeaderError extends Error {
  private statusCode: number;
  constructor(message = 'No Authorization header was provided.') {
    super(message);
    this.statusCode = 401;
    this.name = 'NoAuthorizationHeaderError';
  }
}

export class IncorrectEmailOrPasswordError extends Error {
  private statusCode: number;
  constructor(message = 'The email or password was incorrect.') {
    super(message);
    this.statusCode = 401;
    this.name = 'IncorrectEmailOrPasswordError';
  }
}

export class ResetPasswordMismatchError extends Error {
  private statusCode: number;
  constructor(message = 'Passwords did not match.') {
    super(message);
    this.statusCode = 422;
    this.name = 'ResetPasswordMismatchError';
  }
}

export class UserDoesNotExistError extends Error {
  private statusCode: number;
  constructor(message = 'The given user does not exist.') {
    super(message);
    this.statusCode = 404;
    this.name = 'UserDoesNotExistError';
  }
}
