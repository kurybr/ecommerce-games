import { Injectable } from "@nestjs/common";

interface Tool {
	name: string;
	description: string;
	parameters: any;
	handler: (params: any, context: any) => Promise<any>;
}

@Injectable()
export class ChatAssistantTools {
    tools: Map<string, Tool> = new Map();
    constructor() { }

    getTools() {  return this.tools; }

    registerTools() {
        this.tools.set('search_products', {
            name: 'search_products',
            description: `Acessa o banco de dados de jogos e retorna uma lista de jogos disponíveis`,
            parameters: {
                type: 'object',
                properties: {
                    term: {
                        type: 'string',
                        description: 'Nome completo ou parcial do jogo que quer buscar maiores informações'
                    }
                },
                required: ['term']
            },
            handler: async (params) => {
                console.log("Ativou a tool", params);

                return [];
            }
        })
    }
}
