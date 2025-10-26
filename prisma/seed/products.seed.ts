import { PrismaClient } from '../generated';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Super Mario 64',
        price: 199.9,
        description: 'Um clássico de aventura em 3D.',
      },
      {
        name: 'The Legend of Zelda: Ocarina of Time',
        price: 249.9,
        description: 'A lendária jornada de Link em Hyrule.',
      },
      {
        name: 'Mario Kart 64',
        price: 179.9,
        description: 'Corridas insanas com os personagens da Nintendo!',
      },
      {
        name: 'Donkey Kong 64',
        price: 189.9,
        description:
          'Aventura em 3D com Donkey Kong e seus amigos em busca das bananas perdidas.',
      },
      {
        name: 'Banjo-Kazooie',
        price: 179.9,
        description:
          'Uma dupla carismática em um mundo cheio de desafios e colecionáveis.',
      },
      {
        name: 'GoldenEye 007',
        price: 159.9,
        description:
          'Clássico de tiro em primeira pessoa baseado no filme de James Bond.',
      },
      {
        name: 'Super Smash Bros.',
        price: 199.9,
        description:
          'Batalhas épicas entre os personagens mais icônicos da Nintendo.',
      },
      {
        name: 'Pokémon Stadium',
        price: 169.9,
        description:
          'Traga seus Pokémon para a arena e lute em batalhas 3D incríveis.',
      },
      {
        name: 'Star Fox 64',
        price: 189.9,
        description:
          'Ação espacial intensa com a equipe Star Fox em batalhas aéreas memoráveis.',
      },
      {
        name: 'Paper Mario',
        price: 209.9,
        description: 'RPG encantador com um visual de papel e muito humor.',
      },
      {
        name: 'Perfect Dark',
        price: 179.9,
        description:
          'Jogo de espionagem futurista e ação desenvolvido pelos criadores de GoldenEye.',
      },
      {
        name: 'Diddy Kong Racing',
        price: 169.9,
        description:
          'Corridas cheias de diversão com karts, aviões e hovercrafts!',
      },
      {
        name: 'Kirby 64: The Crystal Shards',
        price: 159.9,
        description:
          'Junte poderes e explore mundos coloridos com o adorável Kirby.',
      },
    ],
  });
}

main()
  .then(() => console.log('🌱 Seed executado com sucesso!'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
