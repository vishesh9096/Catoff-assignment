import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
