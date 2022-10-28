import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  private async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  private async verifyPassword(password: string, hash: string) {
    const [salt, dbHash] = hash.split('.');
    const testHash = (await scrypt(password, salt, 32)) as Buffer;
    return testHash.toString('hex') == dbHash;
  }

  async signup(enteredEmail: string, enteredPassword: string) {
    // is email already existing
    const existingUsers = await this.usersService.find(enteredEmail);

    if (existingUsers.length) {
      throw new BadRequestException('Email not available');
    }

    const result = await this.hashPassword(enteredPassword);
    const user = await this.usersService.create(enteredEmail, result);
    return user;
  }

  async signin(enteredEmail: string, enteredPassword: string) {
    debugger;
    const existingUsers = await this.usersService.find(enteredEmail);
    if (existingUsers.length !== 1) {
      throw new BadRequestException(
        'Either the email or password is incorrect',
      );
    }
    const user = existingUsers[0];
    const authMatch = await this.verifyPassword(enteredPassword, user.password);
    console.log(authMatch);
    if (!authMatch) {
      throw new BadRequestException('Password does not match');
    }
    console.log('signin success');
    return user;
  }
}
