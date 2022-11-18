import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, ValidateNested } from "class-validator"
import { TwilioMsgDto } from "./twilioMsg.dto"

export class GetTwilioMsgDto {

    @ApiProperty({description: 'Список сообщений от Twilio', type: [TwilioMsgDto]})
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => TwilioMsgDto)
    messages: TwilioMsgDto[]

    constructor(messages){
        this.messages = messages.map(message => new TwilioMsgDto(message))
    }

}