import { inject, injectable } from "inversify";
import { BicycleParking } from "@/lib/bicycleParking";
import { IRepository } from "./IRepository";
import { SERVER_TYPES } from "../types";
import { PrismaClient } from "@generated/prisma/client";

export type IBicycleParkingRepository = IRepository<BicycleParking>;

@injectable()
export class BicycleParkingRepository implements IBicycleParkingRepository {
  constructor(@inject(SERVER_TYPES.Prisma) private prisma: PrismaClient) {}

  async createMany(entities: AsyncIterable<BicycleParking>): Promise<void> {
    const batch: BicycleParking[] = [];

    for await (const entity of entities) {
      batch.push({
        id: entity.id,
        lat: entity.lat,
        lng: entity.lng,
        covered: entity.covered,
        indoor: entity.indoor,
        access: entity.access,
        fee: entity.fee,
        bicycleParking: entity.bicycleParking,
        surveillance: entity.surveillance,
        capacity: entity.capacity,
        gh5: entity.gh5,
      });

      if (batch.length >= 500) {
        await this.prisma.bicycleParking.createMany({
          data: batch,
        });
        batch.length = 0;
      }
    }

    if (batch.length > 0) {
      await this.prisma.bicycleParking.createMany({
        data: batch,
      });
    }
  }

  async findByGeohashes(gh5List: string[]): Promise<BicycleParking[]> {
    return this.prisma.bicycleParking.findMany({
      where: { gh5: { in: gh5List } },
    });
  }
}
