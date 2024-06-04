import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Request,
} from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common/decorators';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('/walletdetails')
  async getwallet(@Body() body: any) {
    return await this.walletService.walletdetails(body.wallet_id);
  }

  @Get('/')
  getAllWallets(@Request() req) {
    return this.walletService.getAllwallets();
  }


  @Post('/delete')
  async deleteWallet(@Body() body: any) {
    return await this.walletService.deletewallet(body.wallet_id);
  }

  @Post('/userwallets')
  async getuserWallets(@Body() body: any) {
    return await this.walletService.getuserwalllets(body.id);
  }

  

 

  @Post('/createwallet')
  async createWallet(@Body() body: any) {
    return await this.walletService.createwallet(body.address , body.id);
  }
}
