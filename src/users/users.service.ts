import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.interface'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto)
    return await user.save()
  }

  async list(): Promise<User[]> {
    return await this.userModel.find().exec()
  }
}
