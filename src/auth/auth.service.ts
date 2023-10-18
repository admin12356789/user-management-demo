import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';
import * as brcypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import SignUpDto from './dto/signup.dto';
import LoginUserDto from './dto/login.dto';

@Injectable()
class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    try {
      const { email, password, firstName, lastName } = signUpDto;
      const hasPassword = await brcypt.hash(password, 10);
      const user = await this.userModel.create({
        email,
        firstName,
        lastName,
        password: hasPassword,
      });

      const token = this.jwtService.sign({
        fullName: `${firstName} ${lastName}`,
        email: email,
        id: user._id,
      });
      return {
        accessToken: token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(dataUser: LoginUserDto) : Promise<{accessToken: string}> {
    try {
      const user = await this.userModel.findOne({ email: dataUser.email });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const isPasswordMatched = await brcypt.compare(dataUser.password, user.password)
      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const jwt = await this.jwtService.signAsync({
        fullName: user.fullName,
        email: user.email,
        id: user._id,
      });
      return {
        accessToken: jwt,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

export default AuthService;
