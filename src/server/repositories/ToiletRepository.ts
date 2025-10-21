import { inject, injectable } from "inversify";
import { Database } from "better-sqlite3";
import { Toilet } from "@/lib/toilets";
import { IRepository } from "./IRepository";
import { SqlDb, bool2int, int2bool } from "../db/SqlDb";
import { SERVER_TYPES } from "../types";

export type IToiletRepository = IRepository<Toilet>;

type ToiletInsert = {
  id: number;
  lat: number;
  lng: number;
  fee: number | null;
  openingHours: string | null;
  changingTable: number | null;
  gh5: string;
};

@injectable()
export class ToiletRepository implements IToiletRepository {
  constructor(@inject(SERVER_TYPES.SqlDb) private db: SqlDb) {}

  createTable(): void {
    this.db.withConnection((conn) => {
      conn.exec(`
        CREATE TABLE IF NOT EXISTS toilets (
          id INTEGER PRIMARY KEY,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          fee INTEGER,
          openingHours TEXT,
          changingTable INTEGER,
          gh5 TEXT NOT NULL
        ) STRICT
      `);

      conn.exec(`
        CREATE INDEX IF NOT EXISTS idx_toilets_gh5 ON toilets(gh5)
      `);
    });
  }

  truncate(): void {
    this.db.withConnection((conn) => {
      conn.exec(`DELETE FROM toilets`);
    });
  }

  async createMany(
    entities: AsyncIterable<Toilet>,
    db?: Database
  ): Promise<void> {
    const insertOne = (conn: Database, entity: Toilet) => {
      const stmt = conn.prepare(`
        INSERT INTO toilets (id, lat, lng, fee, openingHours, changingTable, gh5)
        VALUES (@id, @lat, @lng, @fee, @openingHours, @changingTable, @gh5)
      `);

      const insertData: ToiletInsert = {
        id: entity.id,
        lat: entity.lat,
        lng: entity.lng,
        fee: bool2int(entity.fee),
        openingHours: entity.openingHours,
        changingTable: bool2int(entity.changingTable),
        gh5: entity.gh5,
      };

      stmt.run(insertData);
    };

    if (db) {
      for await (const entity of entities) {
        insertOne(db, entity);
      }
    } else {
      await this.db.withTransaction(async (conn) => {
        for await (const entity of entities) {
          insertOne(conn, entity);
        }
      });
    }
  }

  async findByGeohashes(gh5List: string[]): Promise<Toilet[]> {
    return this.db.withConnection((conn) => {
      const placeholders = gh5List.map(() => "?").join(",");
      const query = `
        SELECT id, lat, lng, fee, openingHours, changingTable, gh5
        FROM toilets
        WHERE gh5 IN (${placeholders})
      `;

      const rows = conn.prepare(query).all(gh5List);
      return rows.map((row: unknown) => {
        const typedRow = row as {
          id: number;
          lat: number;
          lng: number;
          fee: number;
          openingHours: string;
          changingTable: number;
          gh5: string;
        };
        return {
          id: typedRow.id,
          lat: typedRow.lat,
          lng: typedRow.lng,
          fee: int2bool(typedRow.fee) ?? false,
          openingHours: typedRow.openingHours,
          changingTable: int2bool(typedRow.changingTable) ?? false,
          gh5: typedRow.gh5,
        };
      });
    });
  }
}
