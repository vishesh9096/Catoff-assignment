import { HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import prisma from '../DB/db.config';
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
  constructor(

  ) { }




  async editProfile(name: string, email: string, user_id: number) {
    try {
      if(!user_id)
      return {
        message: 'Please provide user id',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
      const isuser = await prisma.users.findFirst({
        where:{
          user_id:user_id
        }
      })

      if(!isuser)
      return {
        message: 'User doesnot exists',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };

      await prisma.users.update({
        where:{
          user_id:user_id
        },
        data:{
          name:name,
          email:email
        }
      })
      return {
        message: 'User updated successfully',
        statusCode: HttpStatus.OK,
      };
      
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      
    }







  }


  async usedetails(user_id: number){
    try {
      if(!user_id)
      return {
        message: 'Please provide user_id',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
      const user = await prisma.users.findFirst({
        where:{
          user_id:user_id

        }
      })

      return {
        message: 'Here are user details',
        statusCode: HttpStatus.OK,
        user:user
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      
    }
  }

async createuser(name: string, email: string, password: string) {
  try {
    if (!name)
      return {
        message: 'Please provide name',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
    if (!email)
      return {
        message: 'Please provide email',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
    if (!password)
      return {
        message: 'Please provide password',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
      const iscreate = await prisma.users.findFirst({
        where:{
          email:email
        }
      })

      if(iscreate)
      return {
        message: 'User already exists',
        statusCode: HttpStatus.OK,
      };

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.users.create({
        data:{
          name:name,
          email:email,
          password:hashedPassword
        }
      })

      return {
        message: 'User created successfully',
        user:user,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    
    }


  }

  async getAllUsers() {
    try {
      const users = await prisma.users.findMany()
      return {
        message: 'Here are all users',
        statusCode: HttpStatus.OK,
        data:users
      };

      
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    
      
    }

  }


async deleteUser(user_id: number) {

    try {
      if(!user_id)
      return {
        message: 'Please provide userid',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };

      await prisma.users.delete({
        where:{
          user_id:user_id
        }
      })
      return {
        message: 'User deleted',
        statusCode: HttpStatus.OK,
      };
      
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    
      
    }

  }
}
