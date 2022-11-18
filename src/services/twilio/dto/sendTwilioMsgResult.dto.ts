import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class SendTwilioMsgResultDto {

    @ApiProperty({description: 'ID сообщение в логах Twilio', example: '+SM2b14c308c005474c8aa18e05dce3950e'})
    @IsNotEmpty()
    @IsString()
    sid: string

   constructor(sid) {
    this.sid = sid || 'unknown'
   }

}