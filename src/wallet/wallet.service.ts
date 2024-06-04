import { HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import prisma from '../DB/db.config';
const bcrypt = require('bcrypt');
@Injectable()
export class WalletService {
  constructor(

  ) { }





  async walletdetails(wallet_id: number){
    try {
      if(!wallet_id)
      return {
        message: 'Please provide wallet_id',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
      const wallet = await prisma.wallet.findFirst({
        where:{
         wallet_id :wallet_id

        }
      })

      return {
        message: 'Here are wallet details',
        statusCode: HttpStatus.OK,
        wallet:wallet
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      
    }
  }

async createwallet(address: string, user_id: number) {
  try {
    if (!address)
      return {
        message: 'Please provide address',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
    if (!user_id)
      return {
        message: 'Please provide User id',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };
    
      const iswallet = await prisma.wallet.findFirst({
        where:{
          address:address
        }
      })

      if(iswallet)
      return {
        message: 'Wallet already exists',
        statusCode: HttpStatus.OK,
      };


      const wallet = await prisma.wallet.create({
        data:{
          address:address,
          user_id:user_id,

        }
      })

      return {
        message: 'Wallet created successfully',
        user:wallet,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    
    }


  }

  async getAllwallets() {
    try {
      const wallets = await prisma.wallet.findMany()
      return {
        message: 'Here are all wallets',
        statusCode: HttpStatus.OK,
        data:wallets
      };

      
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    
      
    }

  }


async deletewallet(wallet_id: number) {

    try {
      if(!wallet_id)
      return {
        message: 'Please provide wallet_id',
        statusCode: HttpStatus.EXPECTATION_FAILED,
      };

      await prisma.wallet.delete({
        where:{
          wallet_id:wallet_id
        }
      })
      return {
        message: 'Wallet deleted',
        statusCode: HttpStatus.OK,
      };
      
    } catch (error) {
      return {
        message: 'Something went wrong',
        statusCode: HttpStatus.BAD_REQUEST,
      };
    
      
    }

  }



async getuserwalllets(id:number){
  try {

    if(!id)
    return {
      message: 'Please specify user_id',
      statusCode: HttpStatus.BAD_REQUEST,
    };

    const userWithWallets = await prisma.users.findUnique({
      where: {
        user_id: id,
      },
      include: {
        Wallets: true, // Include the related Wallets
      },
    });

    return {
      message: 'Here are wallets',
      statusCode: HttpStatus.BAD_REQUEST,
      wallets:userWithWallets.Wallets
    };
    
    
  } catch (error) {
    return {
      message: 'Something went wrong',
      statusCode: HttpStatus.BAD_REQUEST,
    };
    
  }

}


}
