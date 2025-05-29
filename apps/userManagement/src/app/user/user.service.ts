import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserRequest, Empty, UpdateUserRequest, UserId } from 'types/proto/user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role as EntityRole } from 'libs/common/src/utils/role.enum';

@Injectable()
export class UserService {


  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
async create(createUserDto: CreateUserRequest) {

    const mappedRoles = createUserDto.roles?.map(
        role => EntityRole[role as keyof typeof EntityRole]
    );
    const user = this.userRepository.create({ ...createUserDto,
        roles: mappedRoles,});
    const savedUser = await this.userRepository.save(user);
    return savedUser as User;
}


  findAll(request: Empty) {
    return `This action returns all user`;
  }

  findOne(id: UserId) {
    return `This action returns a #${id} user`;
  }

  update(request: UpdateUserRequest) {
    return `This action updates a #${id} user`;
  }

  remove(request: UserId) {
    return `This action removes a #${id} user`;
  }
}
