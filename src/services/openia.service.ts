import { Injectable, OnModuleInit } from "@nestjs/common";
import OpenAI from "openai";


interface AgentMessage { }


@Injectable()
export class OpenIAService implements OnModuleInit {
    client: OpenAI
    onModuleInit() {
        this.client = new OpenAI({ apiKey: process.env.OPENIA_API_KEY })
    }
}
