import { inject, injectable } from "inversify";
import { Database } from "better-sqlite3";
import { Station } from "@/lib/stations";
import { IRepository } from "./IRepository";
import { SqlDb } from "../db/SqlDb";
import { SERVER_TYPES } from "../types";

export type IStationRepository = IRepository<Station>;

@injectable()
export class StationRepository implements IStationRepository {
  constructor(@inject(SERVER_TYPES.SqlDb) private db: SqlDb) {}

  createTable(): void {
    this.db.withConnection((conn) => {
      conn.exec(`
        CREATE TABLE IF NOT EXISTS stations (
          id INTEGER PRIMARY KEY,
          cap INTEGER,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          name TEXT,
          type TEXT NOT NULL,
          gh5 TEXT NOT NULL
        ) STRICT
      `);

      conn.exec(`
        CREATE INDEX IF NOT EXISTS idx_stations_gh5 ON stations(gh5)
      `);
    });
  }

  truncate(): void {
    this.db.withConnection((conn) => {
      conn.exec(`DELETE FROM stations`);
    });
  }

  async createMany(
    entities: AsyncIterable<Station>,
    db?: Database
  ): Promise<void> {
    const insertOne = (conn: Database, entity: Station) => {
      const stmt = conn.prepare(`
        INSERT INTO stations (id, cap, lat, lng, name, type, gh5)
        VALUES (@id, @cap, @lat, @lng, @name, @type, @gh5)
      `);
      stmt.run(entity);
    };

    if (db) {
      // Use provided connection (already in a transaction)
      for await (const entity of entities) {
        insertOne(db, entity);
      }
    } else {
      // Create own connection with transaction
      await this.db.withTransaction(async (conn) => {
        for await (const entity of entities) {
          insertOne(conn, entity);
        }
      });
    }
  }

  async findByGeohashes(gh5List: string[]): Promise<Station[]> {
    return this.db.withConnection((conn) => {
      const placeholders = gh5List.map(() => "?").join(",");
      const query = `
        SELECT id, cap, lat, lng, name, type, gh5
        FROM stations
        WHERE gh5 IN (${placeholders})
      `;

      const rows = conn.prepare(query).all(gh5List);

      return rows.map((row: unknown) => {
        const typedRow = row as {
          id: number;
          cap: number | null;
          lat: number;
          lng: number;
          name: string | null;
          type: "fountain" | "house";
          gh5: string;
        };
        return {
          id: typedRow.id,
          cap: typedRow.cap,
          lat: typedRow.lat,
          lng: typedRow.lng,
          name: typedRow.name,
          type: typedRow.type,
          gh5: typedRow.gh5,
        };
      });
    });
  }
}
