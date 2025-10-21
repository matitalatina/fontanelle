import "reflect-metadata";
import { Container } from "inversify";
import { IEntityClient, EntityClient } from "./EntityClient";

export const TYPES = {
  EntityClient: Symbol.for("EntityClient"),
};

const container = new Container();

container.bind<IEntityClient>(TYPES.EntityClient).to(EntityClient);

export { container };
