import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class UsersService {
  private readonly DEFAULT_SALT_ROUNDS = 10;
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(
      createUserDto.password,
      this.DEFAULT_SALT_ROUNDS
    );
    return this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }
  findAll() {
    return this.usersRepository.find();
  }
  findOne(id: number) {
    return this.usersRepository.findOne({ id });
  }
  findOneBy(criteria: Partial<User>) {
    return this.usersRepository.findOne(criteria);
  }
  findOneByOrFail(criteria: Partial<User>) {
    return this.usersRepository.findOneOrFail(criteria);
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }
  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
