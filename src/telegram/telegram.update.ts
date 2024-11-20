import { Update, Ctx, On, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramService } from './telegram.service';
import { Logger } from '@nestjs/common';
import { Chat, Message } from 'telegraf/types';

interface ChatInfo {
  id: string;
  type: string;
  name: string;
  isGroup: boolean;
}

interface MessageData {
  type: string;
  text: string;
  from: {
    username?: string;
    firstName: string;
    lastName?: string;
  };
  date: string;
  chat: ChatInfo;
}

@Update()
export class TelegramUpdate {
  private readonly logger = new Logger(TelegramUpdate.name);

  constructor(private telegramService: TelegramService) {}

  private getGroupInfo(ctx: Context): ChatInfo {
    const chat = ctx.chat as Chat;
    const groupInfo: ChatInfo = {
      id: chat.id.toString(),
      type: chat.type,
      name: 'Chat Desconocido',
      isGroup: false
    };

    if (chat.type === 'group' || chat.type === 'supergroup') {
      groupInfo.name = 'title' in chat ? chat.title : 'Sin título';
      groupInfo.isGroup = true;
    } else if (chat.type === 'private') {
      groupInfo.name = 'Chat Privado';
    }

    return groupInfo;
  }

  private async handleHelpRequest(ctx: Context, messageType: string, text?: string) {
    const groupInfo = this.getGroupInfo(ctx);
    const message = ctx.message as Message;

    const messageData: MessageData = {
      type: messageType,
      text: text || 'Archivo multimedia',
      from: {
        username: message.from?.username,
        firstName: message.from?.first_name || 'Usuario',
        lastName: message.from?.last_name,
      },
      date: new Date(message.date * 1000).toLocaleString(),
      chat: groupInfo
    };

    this.logger.log('❗ Nueva solicitud de ayuda:');
    this.logger.log(`🏢 Grupo: ${messageData.chat.name}`);
    this.logger.log(`📝 ID del Grupo: ${messageData.chat.id}`);
    this.logger.log(`📝 Tipo de chat: ${messageData.chat.type}`);
    this.logger.log(`📝 Tipo de mensaje: ${messageType}`);
    if (text) this.logger.log(`📝 Texto: ${text}`);
    this.logger.log(`👤 Solicitante: ${messageData.from.firstName} ${messageData.from.lastName || ''} (@${messageData.from.username || 'sin username'})`);
    this.logger.log(`📅 Fecha: ${messageData.date}`);
    this.logger.log('-------------------');

    try {
      await this.telegramService.saveMessage(messageData);
      await ctx.reply(`✅ Hemos recibido tu solicitud de ayuda con ${messageType}. Un administrador te responderá pronto.`);
    } catch (error) {
      this.logger.error('Error al procesar la solicitud de ayuda:', error);
      await ctx.reply('❌ Ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente más tarde.');
    }
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    try {
      const message = ctx.message as Message.TextMessage;
      if (message?.text?.toLowerCase().includes('#ayuda')) {
        await this.handleHelpRequest(ctx, 'texto', message.text);
      }
    } catch (error) {
      this.logger.error('Error en el manejador de mensajes de texto:', error);
    }
  }

  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    try {
      const message = ctx.message as Message.PhotoMessage;
      if (message?.caption?.toLowerCase().includes('#ayuda')) {
        await this.handleHelpRequest(ctx, 'foto', message.caption);
      }
    } catch (error) {
      this.logger.error('Error en el manejador de fotos:', error);
    }
  }

  @On('video')
  async onVideo(@Ctx() ctx: Context) {
    try {
      const message = ctx.message as Message.VideoMessage;
      if (message?.caption?.toLowerCase().includes('#ayuda')) {
        await this.handleHelpRequest(ctx, 'video', message.caption);
      }
    } catch (error) {
      this.logger.error('Error en el manejador de videos:', error);
    }
  }

  @Command('showgroupinfo')
  async onShowGroupInfo(@Ctx() ctx: Context) {
    try {
      const chat = ctx.chat as Chat;
      const message = `
📱 Información del Chat:
🆔 ID: ${chat.id}
📝 Tipo: ${chat.type}
${chat.type === 'group' || chat.type === 'supergroup' ? 
  `📜 Nombre: ${('title' in chat) ? chat.title : 'Sin título'}` : ''}
`;
      await ctx.reply(message);
      
      this.logger.debug('Información del chat:', {
        id: chat.id,
        type: chat.type,
        title: 'title' in chat ? chat.title : 'Sin título'
      });
    } catch (error) {
      this.logger.error('Error al mostrar la información del grupo:', error);
      await ctx.reply('❌ Error al obtener la información del grupo.');
    }
  }
}