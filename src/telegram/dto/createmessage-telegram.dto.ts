import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMessageTelegramDto {

    @ApiProperty({
        description: 'Mensaje a enviar por Telegram',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    mensaje: string;

    // @ApiProperty({
    //     description: 'Id del Chat de Telegram al que se enviara el mensaje',
    //     nullable: false,
    //     minLength: 1,
    // })
    // @IsString()
    // chatId: string;

}
