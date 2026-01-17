import { inject, injectable } from "inversify";
import { Playground } from "@/lib/playgrounds";
import { IRepository } from "./IRepository";
import { SERVER_TYPES } from "../types";
import { PrismaClient } from "@generated/prisma/client";

export type IPlaygroundRepository = IRepository<Playground>;

@injectable()
export class PlaygroundRepository implements IPlaygroundRepository {
  constructor(@inject(SERVER_TYPES.Prisma) private prisma: PrismaClient) {}

  async createMany(entities: AsyncIterable<Playground>): Promise<void> {
    const batch: Playground[] = [];

    for await (const entity of entities) {
      batch.push({
        id: entity.id,
        lat: entity.lat,
        lng: entity.lng,
        name: entity.name,
        openingHours: entity.openingHours,
        indoor: entity.indoor,
        fee: entity.fee,
        supervised: entity.supervised,
        gh5: entity.gh5,
      });

      if (batch.length >= 500) {
        await this.prisma.playground.createMany({
          data: batch,
        });
        batch.length = 0;
      }
    }

    if (batch.length > 0) {
      await this.prisma.playground.createMany({
        data: batch,
      });
    }
  }

  async findByGeohashes(gh5List: string[]): Promise<Playground[]> {
    return this.prisma.playground.findMany({
      where: { gh5: { in: gh5List } },
    });
  }
}
