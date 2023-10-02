export class AuthError extends Error {
  constructor() {
    super('User or Pwd incorrect')
  }
}
