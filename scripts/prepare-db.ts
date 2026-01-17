import { getBicycleParkingsFromOSM } from "@/lib/bicycleParking";
import { getStations } from "@/lib/stations";
import { getToiletsFromOSM } from "@/lib/toilets";
import { getPlaygroundsFromOSM } from "@/lib/playgrounds";
import {
  OverpassDownloader,
  getOverpassQueries,
} from "@/lib/overpass-downloader";
import * as fs from "fs";
import path from "path";
import { execSync } from "child_process";
import geohash from "ngeohash";
import { serverContainer, SERVER_TYPES } from "@/server/container";
import { IStationRepository } from "@/server/repositories/StationRepository";
import { IToiletRepository } from "@/server/repositories/ToiletRepository";
import { IBicycleParkingRepository } from "@/server/repositories/BicycleParkingRepository";
import { IPlaygroundRepository } from "@/server/repositories/PlaygroundRepository";

const dbPath = path.join(__dirname, "..", "db", "db.db");

interface Repositories {
  stationRepo: IStationRepository;
  toiletRepo: IToiletRepository;
  bicycleParkingRepo: IBicycleParkingRepository;
  playgroundRepo: IPlaygroundRepository;
}

// Create tables using Prisma
function createSchema() {
  console.log("🏗️  Creating database schema via Prisma...");
  try {
    // Run prisma db push to create tables
    execSync("npx prisma db push", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ Error running prisma db push:", error);
    throw error;
  }
}

// Function to generate geohash with precision 5
function generateGeohash(lat: number, lng: number): string {
  return geohash.encode(lat, lng, 5);
}

// Async generator wrapper that adds geohashes
async function* addGeohashes<
  T extends { lat: number; lng: number; gh5: string }
>(entities: AsyncIterable<T>): AsyncGenerator<T> {
  for await (const entity of entities) {
    yield {
      ...entity,
      gh5: generateGeohash(entity.lat, entity.lng),
    };
  }
}

async function populateTables(repositories: Repositories) {
  // All inserts happen in a single transaction for optimal performance
  // Items are still processed one by one from generators (no bulk loading in memory)

  await repositories.bicycleParkingRepo.createMany(
    addGeohashes(getBicycleParkingsFromOSM())
  );

  await repositories.toiletRepo.createMany(addGeohashes(getToiletsFromOSM()));

  await repositories.stationRepo.createMany(addGeohashes(getStations()));

  await repositories.playgroundRepo.createMany(getPlaygroundsFromOSM());
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

  // Get repositories from container once
  const repositories: Repositories = {
    stationRepo: serverContainer.get<IStationRepository>(
      SERVER_TYPES.StationRepository
    ),
    toiletRepo: serverContainer.get<IToiletRepository>(
      SERVER_TYPES.ToiletRepository
    ),
    bicycleParkingRepo: serverContainer.get<IBicycleParkingRepository>(
      SERVER_TYPES.BicycleParkingRepository
    ),
    playgroundRepo: serverContainer.get<IPlaygroundRepository>(
      SERVER_TYPES.PlaygroundRepository
    ),
  };

  // Create database and tables
  console.log("🏗️  Setting up database...");
  try {
    createSchema();
    console.log("📊 Populating database with downloaded data...");
    await populateTables(repositories);
  } catch (error) {
    console.error("❌ Error creating database:", error);
    throw error;
  }

  console.log(`✅ Database created successfully at ${dbPath}`);
}

// Run the script
main();
