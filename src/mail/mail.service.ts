import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('MAIL_FROM'),
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error.stack);
      throw new Error('Failed to send email');
    }
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verifyUrl = `${this.configService.get<string>('FRONTEND_URL')}/verify-email?token=${token}`;

    const html = `
      <h3>Email Verification</h3>
      <p>Please click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await this.sendMail(to, 'Verify your email', html);
  }

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    const html = `
      <h3>Password Reset OTP</h3>
      <p>Your OTP for password reset is:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
    `;

    await this.sendMail(to, 'Your password reset OTP', html);
  }
}
