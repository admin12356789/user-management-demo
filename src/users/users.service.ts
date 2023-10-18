import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';
import CreateUserDto from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new NotFoundException();
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPage(limit: number, page: number) {
    try {
      const total = await this.userModel.count();
      const data = await this.userModel
        .find({})
        .skip(page * limit)
        .limit(limit)
        .exec();
      return {
        data,
        total,
        page,
        last_page: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll() {
    try {
      const total = await this.userModel.count();
      const data = await this.userModel.find({});
      return {
        total,
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(userData: CreateUserDto) {
    userData.password = await bcrypt.hash(userData.password, 10);
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async update(id: string, userData: CreateUserDto) {
    try {
      const user = await this.userModel
        .findByIdAndUpdate(id, userData)
        .setOptions({
          overwrite: true,
          new: true,
        });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(userId: string) {
    try {
      const result = await this.userModel.findByIdAndDelete(userId);
      if (!result) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

export default UsersService;
