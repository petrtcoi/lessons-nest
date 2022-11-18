import axios from 'axios';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from '../../entities/user/user.service';
import { UserDto } from '../../entities/user/dto/user.dto';

const YA_OAUTH_URL = 'https://login.yandex.ru/info?format=json';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private userService: UserService) {
    super();
  }
  static key = 'custom';

  async validate(req: Request): Promise<UserDto> {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException();
    const token = req.headers.authorization.replace('OAuth ', '');
    const userByToken = await this.userService.findByToken(token);
    if (userByToken) return new UserDto(userByToken);

    const response = await axios.get(YA_OAUTH_URL, {
      headers: { Authorization: `OAuth ${token}` },
    });
    const userEmail = response.data.emails[0];
    const userByEmail = await this.userService.findByEmail(userEmail);
    if (!userByEmail) throw new UnauthorizedException();

    await this.userService.addToken(userByEmail._id, token);
    return new UserDto(userByEmail);
  }
}
