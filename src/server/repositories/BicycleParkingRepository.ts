import { inject, injectable } from "inversify";
import { BicycleParking } from "@/lib/bicycleParking";
import { IRepository } from "./IRepository";
import { SERVER_TYPES } from "../types";
import { PrismaClient } from "@generated/prisma/client";

export type IBicycleParkingRepository = IRepository<BicycleParking>;

@injectable()
export class BicycleParkingRepository implements IBicycleParkingRepository {
  constructor(@inject(SERVER_TYPES.Prisma) private prisma: PrismaClient) {}

  createTable(): void {
    // No-op
  }

  truncate(): void {
    // No-op
  }

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
    const parkings = await this.prisma.bicycleParking.findMany({
      where: { gh5: { in: gh5List } },
    });

    return parkings.map((p) => ({
      id: p.id,
      lat: p.lat,
      lng: p.lng,
      covered: p.covered ?? null,
      indoor: p.indoor ?? null,
      access: p.access,
      fee: p.fee ?? null,
      bicycleParking: p.bicycleParking,
      surveillance: p.surveillance ?? null,
      capacity: p.capacity,
      gh5: p.gh5,
    }));
  }
}
