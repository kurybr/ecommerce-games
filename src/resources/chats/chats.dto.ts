import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class IMessage {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsUUID()
    @IsOptional()
    chatId: string;
}
