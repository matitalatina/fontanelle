/**
 * Server-side dependency injection container
 *
 * IMPORTANT: This file should NEVER be imported in client-side code.
 * It contains server-only dependencies and will cause build errors if
 * imported in client components.
 */

import "reflect-metadata";
import { Container } from "inversify";
import {
  IStationRepository,
  StationRepository,
} from "./repositories/StationRepository";
import {
  IToiletRepository,
  ToiletRepository,
} from "./repositories/ToiletRepository";
import {
  IBicycleParkingRepository,
  BicycleParkingRepository,
} from "./repositories/BicycleParkingRepository";
import {
  IPlaygroundRepository,
  PlaygroundRepository,
} from "./repositories/PlaygroundRepository";
import { PrismaClient } from "@generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import { SERVER_TYPES } from "./types";

const serverContainer = new Container();

// Initialize the database connection
// Extract path from DATABASE_URL or use default relative path
// PrismaBetterSqlite3 expects a config object, not a Database instance
const dbPath =
  process.env.DATABASE_URL || path.join(process.cwd(), "db", "db.db");
const adapter = new PrismaBetterSqlite3({
  url: dbPath,
});

// Bind database service
serverContainer.bind<PrismaClient>(SERVER_TYPES.Prisma).toConstantValue(
  new PrismaClient({
    adapter,
  }),
);

// Bind repositories
serverContainer
  .bind<IStationRepository>(SERVER_TYPES.StationRepository)
  .to(StationRepository);

serverContainer
  .bind<IToiletRepository>(SERVER_TYPES.ToiletRepository)
  .to(ToiletRepository);

serverContainer
  .bind<IBicycleParkingRepository>(SERVER_TYPES.BicycleParkingRepository)
  .to(BicycleParkingRepository);

serverContainer
  .bind<IPlaygroundRepository>(SERVER_TYPES.PlaygroundRepository)
  .to(PlaygroundRepository);

export { serverContainer, SERVER_TYPES };
