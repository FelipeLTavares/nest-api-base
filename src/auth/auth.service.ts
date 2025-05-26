import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyInUseException } from 'src/common/exceptions/email-already-in-use.exception';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async login(data: any) {
    const foundedUser = await this.userRepository.findByEmail(data.email);
    if (!foundedUser) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(data.password, foundedUser.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: foundedUser.id,
      name: foundedUser.name,
      email: foundedUser.email
    };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: '60s' };
  }

  async register(data: any) {
    const userByEmail = await this.userRepository.findByEmail(data.email);
    if (userByEmail) throw new EmailAlreadyInUseException(data.email);

    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = this.userRepository.create({ name, email, password: hashedPassword });
    const savedUser: User = await this.userRepository.save(user);

    return savedUser;
  }
}
