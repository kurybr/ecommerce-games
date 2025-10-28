import { Injectable } from "@nestjs/common";
import { ProductsService } from "../products/products.service";

interface Tool {
	name: string;
	description: string;
	parameters: any;
	handler: (params: any, context: any) => Promise<any>;
}

@Injectable()
export class ChatAssistantTools {
    tools: Map<string, Tool> = new Map();
    constructor(private readonly products: ProductsService) { }
    registerTools() {
        this.tools.set('search_products', {
            name: 'search_products',
            description: `Acessa o banco de dados de jogos e retorna uma lista de jogos disponíveis`,
            parameters: {
                type: 'object',
                properties: {
                    term: {
                        type: 'string',
                        description: 'Caso precise buscar sobre um titulo de jogo nome completo ou parcial do titulo utilize esse parametro'
                    }
                },
                required: ['term']
            },
            handler: async ({ term }) => {
                const items = await this.products.findAll( term )
                return items;
            }
        })


        this.tools.set('get_details_of_products', {
            name: 'get_details_of_products',
            description: `
            Acessa o banco de dados de jogos para recuperar informações sobre um jogo especifico
            IMPORTANTE: Use primeiro a ferramenta search_products para obter os ID do produto
            `.trim(),
            parameters: {
                type: 'object',
                properties: {
                    productId: {
                        type: 'string',
                        description: 'ID do jogo que deseja recuperar mais informações'
                    }
                },
                required: ['productId']
            },
            handler: async (params) => {
                if(!params.productId) {
                    return "Não foi identificado o código do produto que procura"
                }
                const product = await this.products.findOne(params.productId)
                return product;
            }
        })
    }
}
