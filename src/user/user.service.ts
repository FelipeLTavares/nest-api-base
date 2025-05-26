import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) { }

  findAll() {
    const asd = this.configService.get<string>('TESTE');
    return this.userRepository.findAll()
    // return `This action returns all user => ${asd}`;
  }
}
