import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getPage(limit: number, page: number){
    const total = await this.userModel.count()
    const data= await this.userModel.find({}).skip(page * limit ).limit(limit).exec()
    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit )
    }
  }

  async getAll() {
    const total = await this.userModel.count()
    const data = await this.userModel.find({})
    return {
      total,
      data
    }
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id)
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(userData: CreateUserDto) {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async update(id: string, userData: CreateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, userData).setOptions({
      overwrite: true,
      new: true
    })
    return user
  }

  async delete(userId: string) {
   const result = await  this.userModel.findByIdAndDelete(userId);
   if(!result){
    throw new NotFoundException()
   }
  }
}

export default UsersService;