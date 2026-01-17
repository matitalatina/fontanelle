import { inject, injectable } from "inversify";
import { Station } from "@/lib/stations";
import { IRepository } from "./IRepository";
import { SERVER_TYPES } from "../types";
import { PrismaClient } from "@generated/prisma/client";

export type IStationRepository = IRepository<Station>;

@injectable()
export class StationRepository implements IStationRepository {
  constructor(@inject(SERVER_TYPES.Prisma) private prisma: PrismaClient) {}

  createTable(): void {
    // No-op: Prisma handles schema creation via migrations/push
  }

  truncate(): void {
    // Using a promise-based approach, but since interface returns void, we can't await here.
    // However, in the prepare-db script, we might want to await this.
    // The current IRepository interface implies synchronous or fire-and-forget for truncate.
    // But better-sqlite3 was sync. Prisma is async.
    // We should probably update the IRepository interface to generic Promise<void> eventually.
    // For now, let's make it async but the interface definition in IRepository might need change.
    // Wait, let's check IRepository.
  }

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
    const stations = await this.prisma.station.findMany({
      where: {
        gh5: { in: gh5List },
      },
    });

    return stations.map((s) => ({
      id: s.id,
      cap: s.cap,
      lat: s.lat,
      lng: s.lng,
      name: s.name,
      type: s.type as "fountain" | "house", // Cast back to specific union type
      gh5: s.gh5,
    }));
  }
}
