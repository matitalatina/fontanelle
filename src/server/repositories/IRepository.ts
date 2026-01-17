/**
 * Base repository interface for entities that can be queried by geohash
 */
export interface IRepository<T> {
  /**
   * Find entities by their geohash prefixes
   * @param gh5List List of geohash prefixes to search for
   * @returns Promise resolving to array of entities
   */
  findByGeohashes(gh5List: string[]): Promise<T[]>;

  /**
   * Create multiple entities using a shared connection (for batch inserts)
   * @param entities The entities to create
   */
  createMany(entities: AsyncIterable<T>): Promise<void>;

  /**
   * Create database tables and indexes
   * @deprecated Prisma handles this via migrations/push
   */
  createTable(): void;

  /**
   * Clear all data from the table
   */
  truncate(): void;
}
