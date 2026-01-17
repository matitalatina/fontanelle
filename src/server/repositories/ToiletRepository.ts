import { inject, injectable } from "inversify";
import { Toilet } from "@/lib/toilets";
import { IRepository } from "./IRepository";
import { SERVER_TYPES } from "../types";
import { PrismaClient } from "@generated/prisma/client";

export type IToiletRepository = IRepository<Toilet>;

@injectable()
export class ToiletRepository implements IToiletRepository {
  constructor(@inject(SERVER_TYPES.Prisma) private prisma: PrismaClient) {}

  async createMany(entities: AsyncIterable<Toilet>): Promise<void> {
    const batch: Toilet[] = [];

    for await (const entity of entities) {
      batch.push({
        id: entity.id,
        lat: entity.lat,
        lng: entity.lng,
        fee: entity.fee,
        openingHours: entity.openingHours,
        changingTable: entity.changingTable,
        gh5: entity.gh5,
      });

      if (batch.length >= 500) {
        await this.prisma.toilet.createMany({
          data: batch,
        });
        batch.length = 0;
      }
    }

    if (batch.length > 0) {
      await this.prisma.toilet.createMany({
        data: batch,
      });
    }
  }

  async findByGeohashes(gh5List: string[]): Promise<Toilet[]> {
    return this.prisma.toilet.findMany({
      where: { gh5: { in: gh5List } },
    });
  }
}
