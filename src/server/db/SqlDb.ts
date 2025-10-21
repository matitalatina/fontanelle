import { injectable } from "inversify";
import DB, { Database } from "better-sqlite3";
import path from "path";

/**
 * Convert boolean to integer for SQLite storage
 */
export function bool2int(value: boolean | null): number | null {
  if (value === null) return null;
  return value ? 1 : 0;
}

/**
 * Convert integer to boolean from SQLite storage
 */
export function int2bool(value: number | null): boolean | null {
  if (value === null) return null;
  return value === 1;
}

/**
 * SqlDb service provides database connection management
 */
@injectable()
export class SqlDb {
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), "db", "db.db");
  }

  /**
   * Get a database connection
   * Note: Caller is responsible for closing the connection
   */
  getConnection(): Database {
    return DB(this.dbPath);
  }

  /**
   * Execute a function with a database connection and automatically close it
   */
  withConnection<T>(fn: (db: Database) => T): T {
    const db = this.getConnection();
    try {
      return fn(db);
    } finally {
      db.close();
    }
  }

  /**
   * Execute an async function with a database connection and automatically close it
   */
  async withConnectionAsync<T>(fn: (db: Database) => Promise<T>): Promise<T> {
    const db = this.getConnection();
    try {
      return await fn(db);
    } finally {
      db.close();
    }
  }

  /**
   * Execute a function within a transaction
   * Automatically commits on success, rolls back on error
   */
  async withTransaction<T>(fn: (db: Database) => Promise<T>): Promise<T> {
    const db = this.getConnection();
    try {
      db.exec("BEGIN TRANSACTION");
      const result = await fn(db);
      db.exec("COMMIT");
      return result;
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    } finally {
      db.close();
    }
  }
}
