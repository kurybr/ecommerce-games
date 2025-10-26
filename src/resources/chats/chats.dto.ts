import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class IMessage {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsUUID()
    @IsOptional()
    chatId: string;
}
