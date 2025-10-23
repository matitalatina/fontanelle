import "reflect-metadata";
import { Container } from "inversify";
import {
  IMapEntitiesService,
  MapEntitiesService,
} from "@/client/MapEntities.service";
import { EntityClient, IEntityClient } from "./EntityClient";
import { TYPES } from "./types";

const container = new Container();

container.bind<IEntityClient>(TYPES.EntityClient).to(EntityClient);
container
  .bind<IMapEntitiesService>(TYPES.MapEntitiesService)
  .to(MapEntitiesService)
  .inSingletonScope();

export { container };
