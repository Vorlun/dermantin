import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/user')
  @ApiOperation({ summary: 'User signup' })
  signupUser(@Body() body: any) {
    return this.authService.signupUser(body);
  }

  @Post('signup/admin')
  @ApiOperation({ summary: 'Admin signup' })
  signupAdmin(@Body() body: any) {
    return this.authService.signupAdmin(body);
  }

  @Post('signin/user')
  @ApiOperation({ summary: 'User signin' })
  signinUser(@Body() body: { email: string; password: string }) {
    return this.authService.signinUser(body.email, body.password);
  }

  @Post('signin/admin')
  @ApiOperation({ summary: 'Admin signin' })
  signinAdmin(@Body() body: { email: string; password: string }) {
    return this.authService.signinAdmin(body.email, body.password);
  }

  @Post('signout/user')
  @ApiOperation({ summary: 'User signout' })
  signoutUser(@Body() body: { userId: number }) {
    return this.authService.signoutUser(body.userId);
  }

  @Post('signout/admin')
  @ApiOperation({ summary: 'Admin signout' })
  signoutAdmin(@Body() body: { adminId: number }) {
    return this.authService.signoutAdmin(body.adminId);
  }

  @Post('refresh/user')
  @ApiOperation({ summary: 'Refresh user token' })
  refreshUser(@Body() body: { userId: number; refreshToken: string }) {
    return this.authService.refreshUser(body.userId, body.refreshToken);
  }

  @Post('refresh/admin')
  @ApiOperation({ summary: 'Refresh admin token' })
  refreshAdmin(@Body() body: { adminId: number; refreshToken: string }) {
    return this.authService.refreshAdmin(body.adminId, body.refreshToken);
  }

@Post('verify-email')
verifyEmail(@Body() body: { token: string }) {
  return this.authService.verifyEmail(body.token);
}

}
