import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './input/create-user.input';
import { UpdateUserInput } from './input/update-user.input';
import { ChangePasswordInput } from './input/change-password.input';
import { ResetPasswordInput } from './input/reset-password.input';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { randomBytes } from 'crypto';
import { ForgotPasswordInput } from './input/forget-password.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(input: CreateUserInput): Promise<User> {
    if (input.password !== input.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const verificationToken = randomBytes(32).toString('hex');

    const user = this.usersRepository.create({
      ...input,
      password: hashedPassword,
      verificationToken,
    });

    const savedUser = await this.usersRepository.save(user);
    await this.mailService.sendVerificationEmail(savedUser.email, verificationToken);

    return savedUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, input: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    if ('password' in input) {
      delete input.password;
    }
    Object.assign(user, input);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return user;
  }

  async verifyEmail(token: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { verificationToken: token } });
    if (!user) throw new BadRequestException('Invalid or expired verification token');
    user.is_verified = true;
    user.verificationToken = undefined;
    await this.usersRepository.save(user);
    return 'Email successfully verified';
  }

  async changePassword(id: number, input: ChangePasswordInput): Promise<string> {
    const user = await this.findOne(id);
    const isValid = await bcrypt.compare(input.oldPassword, user.password);
    if (!isValid) throw new BadRequestException('Old password is incorrect');
    if (input.newPassword !== input.confirmNewPassword) throw new BadRequestException('Passwords do not match');
    user.password = await bcrypt.hash(input.newPassword, 10);
    await this.usersRepository.save(user);
    return 'Password successfully changed';
  }

  async forgotPassword(input: ForgotPasswordInput): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { email: input.email } });
    if (!user) throw new NotFoundException('User not found');
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    user.resetPasswordOtp = otp;
    await this.usersRepository.save(user);
    await this.mailService.sendOtpEmail(user.email, otp);
    return 'OTP sent to your email';
  }

  async resetPassword(input: ResetPasswordInput): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { email: input.email } });
    if (!user) throw new NotFoundException('User not found');
    if (user.resetPasswordOtp !== input.otp) throw new BadRequestException('Invalid OTP');
    if (input.newPassword !== input.confirmNewPassword) throw new BadRequestException('Passwords do not match');
    user.password = await bcrypt.hash(input.newPassword, 10);
    user.resetPasswordOtp = undefined;
    await this.usersRepository.save(user);
    return 'Password successfully reset';
  }
}
