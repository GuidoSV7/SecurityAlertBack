import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CreateMessageTelegramDto } from './dto/createmessage-telegram.dto';




@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}
  
  // @Post('sendMessage')
  // sendMessage(@Body() createMessageTelegramDto: CreateMessageTelegramDto) {
  //   return this.telegramService.sendMessage(createMessageTelegramDto);
  // }


}
