import jwt, { SignOptions } from 'jsonwebtoken'
import * as argon2 from 'argon2'
import * as dotenv from 'dotenv'
import { payload } from '../models/user.model'

dotenv.config()
const { JWT_SECRET = '' } = process.env

export class Encrypt {
  static async encryptPass(password: string): Promise<string> {
    return argon2.hash(password)
  }

  static async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashPassword, password)
  }

  static generateToken(payload: payload): string {
    const options: SignOptions = { expiresIn: '1d' }
    return jwt.sign(payload, JWT_SECRET, options)
  }
}
