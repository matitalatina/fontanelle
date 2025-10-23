import { injectable } from "inversify";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import { BicycleParking } from "@/lib/bicycleParking";
import { Playground } from "@/lib/playgrounds";

// Entity types configuration
export type EntityType =
  | "stations"
  | "toilets"
  | "bicycleParkings"
  | "playgrounds";
export type EntityData = Station | Toilet | BicycleParking | Playground;

export interface EntityConfig {
  apiPath: string;
}

export const ENTITY_CONFIG: Record<EntityType, EntityConfig> = {
  stations: { apiPath: "/api/v1/fountains" },
  toilets: { apiPath: "/api/v1/toilets" },
  bicycleParkings: { apiPath: "/api/v1/bicycle-parkings" },
  playgrounds: { apiPath: "/api/v1/playgrounds" },
};

export interface IEntityClient {
  fetchEntities(
    entityType: EntityType,
    geohashes: string[]
  ): Promise<EntityData[]>;
}

@injectable()
export class EntityClient implements IEntityClient {
  async fetchEntities(
    entityType: EntityType,
    geohashes: string[]
  ): Promise<EntityData[]> {
    const config = ENTITY_CONFIG[entityType];
    const response = await fetch(
      `${config.apiPath}?gh5=${geohashes.join(",")}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${entityType}`);
    }

    const data: EntityData[] = await response.json();
    return data;
  }
}
