/**
 * InversifyJS type symbols for server-side dependency injection
 */
export const SERVER_TYPES = {
  Prisma: Symbol.for("Prisma"),
  StationRepository: Symbol.for("StationRepository"),
  ToiletRepository: Symbol.for("ToiletRepository"),
  BicycleParkingRepository: Symbol.for("BicycleParkingRepository"),
  PlaygroundRepository: Symbol.for("PlaygroundRepository"),
};
