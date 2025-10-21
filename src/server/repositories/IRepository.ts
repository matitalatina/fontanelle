import { Database } from "better-sqlite3";

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
   * @param db Optional database connection to reuse
   */
  createMany(entities: AsyncIterable<T>, db?: Database): Promise<void>;

  /**
   * Create database tables and indexes
   */
  createTable(): void;

  /**
   * Clear all data from the table
   */
  truncate(): void;
}
