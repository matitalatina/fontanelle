import { inject, injectable } from "inversify";
import { Station } from "@/lib/stations";
import { IRepository } from "./IRepository";
import { SERVER_TYPES } from "../types";
import { PrismaClient } from "@generated/prisma/client";

export type IStationRepository = IRepository<Station>;

@injectable()
export class StationRepository implements IStationRepository {
  constructor(@inject(SERVER_TYPES.Prisma) private prisma: PrismaClient) {}

  async createMany(entities: AsyncIterable<Station>): Promise<void> {
    const batch: Station[] = [];

    for await (const entity of entities) {
      batch.push({
        id: entity.id,
        cap: entity.cap,
        lat: entity.lat,
        lng: entity.lng,
        name: entity.name,
        type: entity.type,
        gh5: entity.gh5,
      });

      // Batch insert in chunks of 500
      if (batch.length >= 500) {
        await this.prisma.station.createMany({
          data: batch,
        });
        batch.length = 0;
      }
    }

    if (batch.length > 0) {
      await this.prisma.station.createMany({
        data: batch,
      });
    }
  }

  async findByGeohashes(gh5List: string[]): Promise<Station[]> {
    return this.prisma.station.findMany({
      where: {
        gh5: { in: gh5List },
      },
    });
  }
}
