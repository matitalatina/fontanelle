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
import { SqlDb } from "./db/SqlDb";
import { SERVER_TYPES } from "./types";

const serverContainer = new Container();

// Bind database service
serverContainer.bind<SqlDb>(SERVER_TYPES.SqlDb).to(SqlDb).inSingletonScope();

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
