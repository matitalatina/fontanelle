import { getBicycleParkingsFromOSM } from "@/lib/bicycleParking";
import { getStations } from "@/lib/stations";
import { getToiletsFromOSM } from "@/lib/toilets";
import { getPlaygroundsFromOSM } from "@/lib/playgrounds";
import {
  OverpassDownloader,
  getOverpassQueries,
} from "@/lib/overpass-downloader";
import DB, { type Database } from "better-sqlite3";
import * as fs from "fs";
import path from "path";
import geohash from "ngeohash";

const dbPath = path.join(__dirname, "..", "db", "db.db");

// Create tables
function createTables(db: Database) {
  // Enable foreign keys
  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");

  // Create bicycle_parkings table
  db.exec(`
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

  // Create index on gh5 for bicycle_parkings
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_bicycle_parkings_gh5 ON bicycle_parkings(gh5)
  `);

  // Create toilets table
  db.exec(`
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

  // Create index on gh5 for toilets
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_toilets_gh5 ON toilets(gh5)
  `);

  // Create stations table
  db.exec(`
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

  // Create index on gh5 for stations
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_stations_gh5 ON stations(gh5)
  `);

  // Create playgrounds table
  db.exec(`
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

  // Create index on gh5 for playgrounds
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_playgrounds_gh5 ON playgrounds(gh5)
  `);

  console.log("Tables created successfully");
}

function bool2int(value: boolean | null): number | null {
  if (value === null) return null;
  return value ? 1 : 0;
}

// Function to generate geohash with precision 5
function generateGeohash(lat: number, lng: number): string {
  return geohash.encode(lat, lng, 5);
}

async function populateTables(db: Database) {
  const insertBicycleQuery = db.prepare(
    `
    INSERT INTO bicycle_parkings (id, lat, lng, covered, indoor, access, fee, bicycleParking, surveillance, capacity, gh5)
    VALUES (@id, @lat, @lng, @covered, @indoor, @access, @fee, @bicycleParking, @surveillance, @capacity, @gh5)
  `
  );
  const insertToiletQuery = db.prepare(
    `
    INSERT INTO toilets (id, lat, lng, fee, openingHours, changingTable, gh5)
    VALUES (@id, @lat, @lng, @fee, @openingHours, @changingTable, @gh5)
  `
  );
  const insertStationQuery = db.prepare(
    `
    INSERT INTO stations (id, cap, lat, lng, name, type, gh5)
    VALUES (@id, @cap, @lat, @lng, @name, @type, @gh5)
  `
  );

  const insertPlaygroundQuery = db.prepare(
    `
    INSERT INTO playgrounds (id, lat, lng, name, openingHours, indoor, fee, supervised, gh5)
    VALUES (@id, @lat, @lng, @name, @openingHours, @indoor, @fee, @supervised, @gh5)
  `
  );

  // Process bicycle parkings using the async generator
  for await (const bicycleParking of getBicycleParkingsFromOSM()) {
    // Convert boolean values to integers for SQLite
    insertBicycleQuery.run({
      id: bicycleParking.id,
      lat: bicycleParking.lat,
      lng: bicycleParking.lng,
      covered: bool2int(bicycleParking.covered),
      indoor: bool2int(bicycleParking.indoor),
      access: bicycleParking.access,
      fee: bool2int(bicycleParking.fee),
      bicycleParking: bicycleParking.bicycleParking,
      surveillance: bool2int(bicycleParking.surveillance),
      capacity: bicycleParking.capacity,
      gh5: generateGeohash(bicycleParking.lat, bicycleParking.lng),
    });
  }

  // Process toilets using the async generator
  for await (const toilet of getToiletsFromOSM()) {
    // Convert boolean values to integers for SQLite
    insertToiletQuery.run({
      id: toilet.id,
      lat: toilet.lat,
      lng: toilet.lng,
      fee: bool2int(toilet.fee),
      openingHours: toilet.openingHours,
      changingTable: bool2int(toilet.changingTable),
      gh5: generateGeohash(toilet.lat, toilet.lng),
    });
  }

  // Process stations using the async generator
  for await (const station of getStations()) {
    insertStationQuery.run({
      ...station,
      gh5: generateGeohash(station.lat, station.lng),
    });
  }

  // Process playgrounds using the async generator
  for await (const playground of getPlaygroundsFromOSM()) {
    insertPlaygroundQuery.run({
      id: playground.id,
      lat: playground.lat,
      lng: playground.lng,
      name: playground.name,
      openingHours: playground.openingHours,
      indoor: bool2int(playground.indoor),
      fee: bool2int(playground.fee),
      supervised: bool2int(playground.supervised),
      gh5: generateGeohash(playground.lat, playground.lng),
    });
  }
}

function hasRecentData(): boolean {
  const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const dataFiles = [
    `db/bicycleParking/italy_${today}.csv`,
    `db/toilets/italy_${today}.csv`,
    `db/playgrounds/italy_${today}.csv`,
    `db/water/italy_${today}.csv`,
  ];

  return dataFiles.every((file) =>
    fs.existsSync(path.join(__dirname, "..", file))
  );
}

async function downloadLatestData(force = false) {
  if (!force && hasRecentData()) {
    console.log(
      "📊 Recent data files found, skipping download. Use --force to download anyway."
    );
    return;
  }

  console.log("🚀 Downloading latest POI data from Overpass API...");

  const downloader = new OverpassDownloader();
  const queries = getOverpassQueries();

  try {
    await downloader.downloadAll(queries);
    console.log("✅ All data downloaded successfully!");
  } catch (error) {
    console.error("❌ Download failed:", error);
    if (hasRecentData()) {
      console.log("📊 Using existing recent data files instead.");
    } else {
      throw error;
    }
  }
}

// Main function
async function main() {
  console.log("🔄 Starting automated database preparation...");

  // Check for --force flag
  const forceDownload = process.argv.includes("--force");

  // Download latest data first
  await downloadLatestData(forceDownload);

  // Delete existing DB if it exists
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log("🗑️  Existing database deleted");
  }

  // Create or connect to SQLite database
  console.log("🏗️  Creating database and tables...");
  const db = new DB(dbPath, { verbose: console.log });
  try {
    createTables(db);
    console.log("📊 Populating database with downloaded data...");
    await populateTables(db);
  } catch (error) {
    console.error("❌ Error creating database:", error);
    throw error;
  } finally {
    db.close();
  }

  console.log(`✅ Database created successfully at ${dbPath}`);
}

// Run the script
main();
