import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthServiceDto } from './dto/create-auth-service.dto';
import { UpdateAuthServiceDto } from './dto/update-auth-service.dto';
import { LoginRequest } from 'types/proto/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './../../../../../libs/shared-entities/src/lib/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity> ,
    private readonly jwtService: JwtService, // Assuming you have a JwtService for JWT operations
  ) {}
 async login(request: LoginRequest) {
     try {
      const user = await this.userRepository.findOne({where: { email: request.email } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const isValid = await bcrypt.compareSync(
        request.password,
        user.password,
      );
      // console.log(agent);

      if (isValid) {
        const payload = {
          sub: user.id,
          agentName: user.userName,
          role: user.roles,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
          expiresIn: '10h',
        });

        const refresh_token = await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
        });

        // Set tokens as cookies
        // resp.cookie('accessToken', accessToken, {
        //   httpOnly: true,
        //   maxAge: 10 * 60 * 60 * 1000, // 10 hour
        // });

        // resp.cookie('refresh_token', refresh_token, {
        //   httpOnly: true,
        //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        // });

        // resp.status(200).send({
        //   message: 'Login successful.',
        //   access_token,
        //   refresh_token,
        // });
        return {accessToken};
      } else {
        // resp.status(401).send({
        //   message: 'Password is not valid',
        // });
        throw new UnauthorizedException('Password is not valid');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateUser(request: { userId: string; token: string }) {
    return{
      isValid: true, 
      userId: request.userId,   
      role: 'user', 
    }

  }


  findAll() {
    return `This action returns all authService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authService`;
  }

  update(id: number, updateAuthServiceDto: UpdateAuthServiceDto) {
    return `This action updates a #${id} authService`;
  }

  remove(id: number) {
    return `This action removes a #${id} authService`;
  }
}
