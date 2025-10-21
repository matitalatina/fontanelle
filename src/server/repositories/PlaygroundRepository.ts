import { inject, injectable } from "inversify";
import { Database } from "better-sqlite3";
import { Playground } from "@/lib/playgrounds";
import { IRepository } from "./IRepository";
import { SqlDb, bool2int, int2bool } from "../db/SqlDb";
import { SERVER_TYPES } from "../types";

export type IPlaygroundRepository = IRepository<Playground>;

type PlaygroundInsert = {
  id: number;
  lat: number;
  lng: number;
  name: string | null;
  openingHours: string | null;
  indoor: number | null;
  fee: number | null;
  supervised: number | null;
  gh5: string;
};

@injectable()
export class PlaygroundRepository implements IPlaygroundRepository {
  constructor(@inject(SERVER_TYPES.SqlDb) private db: SqlDb) {}

  createTable(): void {
    this.db.withConnection((conn) => {
      conn.exec(`
        CREATE TABLE IF NOT EXISTS playgrounds (
          id INTEGER PRIMARY KEY,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          name TEXT,
          openingHours TEXT,
          indoor INTEGER,
          fee INTEGER,
          supervised INTEGER,
          gh5 TEXT NOT NULL
        ) STRICT
      `);

      conn.exec(`
        CREATE INDEX IF NOT EXISTS idx_playgrounds_gh5 ON playgrounds(gh5)
      `);
    });
  }

  truncate(): void {
    this.db.withConnection((conn) => {
      conn.exec(`DELETE FROM playgrounds`);
    });
  }

  async createMany(
    entities: AsyncIterable<Playground>,
    db?: Database
  ): Promise<void> {
    const insertOne = (conn: Database, entity: Playground) => {
      const stmt = conn.prepare(`
        INSERT INTO playgrounds (id, lat, lng, name, openingHours, indoor, fee, supervised, gh5)
        VALUES (@id, @lat, @lng, @name, @openingHours, @indoor, @fee, @supervised, @gh5)
      `);

      const insertData: PlaygroundInsert = {
        id: entity.id,
        lat: entity.lat,
        lng: entity.lng,
        name: entity.name,
        openingHours: entity.openingHours,
        indoor: bool2int(entity.indoor),
        fee: bool2int(entity.fee),
        supervised: bool2int(entity.supervised),
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

  async findByGeohashes(gh5List: string[]): Promise<Playground[]> {
    return this.db.withConnection((conn) => {
      const placeholders = gh5List.map(() => "?").join(",");
      const query = `
        SELECT id, lat, lng, name, openingHours, indoor, fee, supervised, gh5
        FROM playgrounds
        WHERE gh5 IN (${placeholders})
      `;

      const rows = conn.prepare(query).all(gh5List);

      return rows.map((row: unknown) => {
        const typedRow = row as {
          id: number;
          lat: number;
          lng: number;
          name: string;
          openingHours: string;
          indoor: number;
          fee: number;
          supervised: number;
          gh5: string;
        };
        return {
          id: typedRow.id,
          lat: typedRow.lat,
          lng: typedRow.lng,
          name: typedRow.name,
          openingHours: typedRow.openingHours,
          indoor: int2bool(typedRow.indoor),
          fee: int2bool(typedRow.fee),
          supervised: int2bool(typedRow.supervised),
          gh5: typedRow.gh5,
        };
      });
    });
  }
}
