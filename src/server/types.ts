/**
 * InversifyJS type symbols for server-side dependency injection
 */
export const SERVER_TYPES = {
  SqlDb: Symbol.for("SqlDb"),
  StationRepository: Symbol.for("StationRepository"),
  ToiletRepository: Symbol.for("ToiletRepository"),
  BicycleParkingRepository: Symbol.for("BicycleParkingRepository"),
  PlaygroundRepository: Symbol.for("PlaygroundRepository"),
};
