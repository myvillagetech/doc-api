import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDTO } from 'src/auth/dto/singup.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schema/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto | SignUpDTO): Promise<UserDocument> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(
    userId: number,
    createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      createUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`user #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<UserDocument[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('users data not found!');
    }
    return userData;
  }

  async getUser(userId: number): Promise<UserDocument> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`user #${userId} not found`);
    }
    return existingUser;
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: email }).exec();
    if (!existingUser) {
      throw new NotFoundException(`user #${email} not found`);
    }
    return existingUser;
  }

  async deleteUser(userId: number): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`user #${userId} not found`);
    }
    return deletedUser;
  }
}
