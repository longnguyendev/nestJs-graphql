import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    } else {
      throw new HttpException('user not found!', HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async error(): Promise<void> {
    throw new HttpException('ahihi đồ ngốc', HttpStatus.FORBIDDEN);
  }
}
