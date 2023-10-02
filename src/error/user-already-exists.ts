export class UserAlreadyExists extends Error {
  code: number
  message: string
  details: string

  constructor(details = '') {
    super('User already exists')
    this.name = 'UserAlreadyExists'
    this.code = 409
    this.message = 'User already exists'
    this.details = details
  }
}
