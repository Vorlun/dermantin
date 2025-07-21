import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AdminsService } from 'src/admins/admins.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Admin } from 'src/admins/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(id: number, email: string, role: string) {
    const payload = { sub: id, email, role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async signupUser(data: any): Promise<User> {
    const user = await this.usersService.create(data);
    return user;
  }

  async signupAdmin(data: any): Promise<Admin> {
    const admin = await this.adminsService.create(data);
    return admin;
  }

  async signinUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user.is_verified) throw new UnauthorizedException('Email not verified');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signinAdmin(email: string, password: string) {
    const admin = await this.adminsService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.generateTokens(admin.id, admin.email, 'admin');
    await this.adminsService.updateRefreshToken(admin.id, tokens.refreshToken);
    return tokens;
  }

  async signoutUser(id: number) {
    await this.usersService.removeRefreshToken(id);
    return true;
  }

  async signoutAdmin(id: number) {
    await this.adminsService.removeRefreshToken(id);
    return true;
  }

  async refreshUser(id: number, refreshToken: string) {
    const user = await this.usersService.findById(id);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refreshAdmin(id: number, refreshToken: string) {
    const admin = await this.adminsService.findById(id);
    if (!admin || admin.refresh_token !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const tokens = await this.generateTokens(admin.id, admin.email, 'admin');
    await this.adminsService.updateRefreshToken(admin.id, tokens.refreshToken);
    return tokens;
  }
  
  async verifyEmail(token: string) {
  return this.usersService.verifyEmail(token);
}

}
