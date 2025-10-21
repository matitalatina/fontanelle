import { inject, injectable } from "inversify";
import { Database } from "better-sqlite3";
import { BicycleParking } from "@/lib/bicycleParking";
import { IRepository } from "./IRepository";
import { SqlDb, bool2int, int2bool } from "../db/SqlDb";
import { SERVER_TYPES } from "../types";

export type IBicycleParkingRepository = IRepository<BicycleParking>;

type BicycleParkingInsert = {
  id: number;
  lat: number;
  lng: number;
  covered: number | null;
  indoor: number | null;
  access: string | null;
  fee: number | null;
  bicycleParking: string | null;
  surveillance: number | null;
  capacity: number | null;
  gh5: string;
};

@injectable()
export class BicycleParkingRepository implements IBicycleParkingRepository {
  constructor(@inject(SERVER_TYPES.SqlDb) private db: SqlDb) {}

  createTable(): void {
    this.db.withConnection((conn) => {
      conn.exec(`
        CREATE TABLE IF NOT EXISTS bicycle_parkings (
          id INTEGER PRIMARY KEY,
          lat REAL NOT NULL,
          lng REAL NOT NULL,
          covered INTEGER,
          indoor INTEGER,
          access TEXT,
          fee INTEGER,
          bicycleParking TEXT,
          surveillance INTEGER,
          capacity INTEGER,
          gh5 TEXT NOT NULL
        ) STRICT  
      `);

      conn.exec(`
        CREATE INDEX IF NOT EXISTS idx_bicycle_parkings_gh5 ON bicycle_parkings(gh5)
      `);
    });
  }

  truncate(): void {
    this.db.withConnection((conn) => {
      conn.exec(`DELETE FROM bicycle_parkings`);
    });
  }

  async createMany(
    entities: AsyncIterable<BicycleParking>,
    db?: Database
  ): Promise<void> {
    const insertOne = (conn: Database, entity: BicycleParking) => {
      const stmt = conn.prepare(`
        INSERT INTO bicycle_parkings (id, lat, lng, covered, indoor, access, fee, bicycleParking, surveillance, capacity, gh5)
        VALUES (@id, @lat, @lng, @covered, @indoor, @access, @fee, @bicycleParking, @surveillance, @capacity, @gh5)
      `);

      const insertData: BicycleParkingInsert = {
        id: entity.id,
        lat: entity.lat,
        lng: entity.lng,
        covered: bool2int(entity.covered),
        indoor: bool2int(entity.indoor),
        access: entity.access,
        fee: bool2int(entity.fee),
        bicycleParking: entity.bicycleParking,
        surveillance: bool2int(entity.surveillance),
        capacity: entity.capacity,
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

  async findByGeohashes(gh5List: string[]): Promise<BicycleParking[]> {
    return this.db.withConnection((conn) => {
      const placeholders = gh5List.map(() => "?").join(",");
      const query = `
        SELECT id, lat, lng, covered, indoor, access, fee, bicycleParking, surveillance, capacity, gh5
        FROM bicycle_parkings
        WHERE gh5 IN (${placeholders})
      `;

      const rows = conn.prepare(query).all(gh5List);

      return rows.map((row: unknown) => {
        const typedRow = row as {
          id: number;
          lat: number;
          lng: number;
          covered: number;
          indoor: number;
          access: string;
          fee: number;
          bicycleParking: string;
          surveillance: number;
          capacity: number;
          gh5: string;
        };
        return {
          id: typedRow.id,
          lat: typedRow.lat,
          lng: typedRow.lng,
          covered: int2bool(typedRow.covered),
          indoor: int2bool(typedRow.indoor),
          access: typedRow.access,
          fee: int2bool(typedRow.fee),
          bicycleParking: typedRow.bicycleParking,
          surveillance: int2bool(typedRow.surveillance),
          capacity: typedRow.capacity,
          gh5: typedRow.gh5,
        };
      });
    });
  }
}
