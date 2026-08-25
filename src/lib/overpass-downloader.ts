import fs from "fs";
import path from "path";

export interface OverpassQuery {
  name: string;
  query: string;
  outputFile: string;
}

interface DownloadOptions {
  force?: boolean;
}

const MAX_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 5000;
const INTER_QUERY_DELAY_MS = 1000;

export class OverpassDownloader {
  private baseUrl = "https://overpass-api.de/api/interpreter";

  private isAlreadyDownloadedToday(query: OverpassQuery): boolean {
    try {
      return fs.statSync(query.outputFile).size > 0;
    } catch {
      return false;
    }
  }

  private cleanupOldFiles(currentFile: string): void {
    const dir = path.dirname(currentFile);
    const keep = path.basename(currentFile);
    if (!fs.existsSync(dir)) {
      return;
    }
    for (const entry of fs.readdirSync(dir)) {
      if (entry !== keep && entry.endsWith(".csv")) {
        const oldFile = path.join(dir, entry);
        fs.unlinkSync(oldFile);
        console.log(`🗑️  Removed outdated data file: ${oldFile}`);
      }
    }
  }

  private async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async downloadQuery(
    query: OverpassQuery,
    options: DownloadOptions = {},
  ): Promise<void> {
    const { force = false } = options;

    if (!force && this.isAlreadyDownloadedToday(query)) {
      console.log(
        `⏭️  ${query.name} was already downloaded today, skipping (${query.outputFile})`,
      );
      return;
    }

    console.log(`Downloading ${query.name}...`);

    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const response = await fetch(this.baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Downloader/1.0 (https://fontanelleitalia.com/)",
            Referer: "https://fontanelleitalia.com/",
          },
          body: `data=${encodeURIComponent(query.query)}`,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        // Ensure directory exists
        const dir = path.dirname(query.outputFile);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(query.outputFile, data, "utf8");
        console.log(
          `Successfully downloaded ${query.name} to ${query.outputFile}`,
        );

        this.cleanupOldFiles(query.outputFile);
        return;
      } catch (error) {
        lastError = error;
        console.error(
          `❌ Attempt ${attempt}/${MAX_ATTEMPTS} failed for ${query.name}:`,
          error instanceof Error ? error.message : error,
        );
        if (attempt < MAX_ATTEMPTS) {
          const delay = RETRY_BASE_DELAY_MS * attempt;
          console.log(`⏳ Retrying in ${delay / 1000}s...`);
          await this.sleep(delay);
        }
      }
    }

    throw lastError;
  }

  async downloadAll(
    queries: OverpassQuery[],
    options: DownloadOptions = {},
  ): Promise<void> {
    console.log(`Starting download of ${queries.length} queries...`);

    for (const query of queries) {
      await this.downloadQuery(query, options);
      // Add a small delay between requests to be respectful to the API
      await new Promise((resolve) => setTimeout(resolve, INTER_QUERY_DELAY_MS));
    }

    console.log("All downloads completed successfully!");
  }
}

export function getOverpassQueries(): OverpassQuery[] {
  const today = new Date().toISOString().split("T")[0].replace(/-/g, "");

  return [
    {
      name: "Bicycle Parkings (Italy)",
      query: `[out:csv(::"id", amenity, name, covered, indoor, access, fee, bicycle_parking, surveillance, capacity, ::lat, ::lon; true;"|")];
    area[name="Italia"]->.italy;
    (node
      [amenity=bicycle_parking]
      (area.italy);
    )->.result;
    .result
    out;`,
      outputFile: `db/bicycleParking/italy_${today}.csv`,
    },
    {
      name: "Toilets (Italy)",
      query: `[out:csv(::"id", amenity, name, fee, opening_hours, changing_table, ::lat, ::lon; true;"|")];
    area[name="Italia"]->.italy;
    (node
      [amenity=toilets]
      (area.italy);
    )->.result;
    .result
    out;`,
      outputFile: `db/toilets/italy_${today}.csv`,
    },
    {
      name: "Playgrounds (Italy)",
      query: `[out:csv(::"id", leisure, name, opening_hours, indoor, fee, supervised, ::lat, ::lon; true;"|")];
    area[name="Italia"]->.italy;
    (
      node[leisure=playground](area.italy);
      way[leisure=playground](area.italy);
    );
    out center;`,
      outputFile: `db/playgrounds/italy_${today}.csv`,
    },
    {
      name: "Water Points (Italy)",
      query: `[out:csv(::"id", amenity, name, ::lat, ::lon; true; "|")];
area[name="Italia"]->.italy;
(
  node["amenity"="drinking_water"](area.italy);
  node["man_made"="water_tap"](area.italy);
);
out;`,
      outputFile: `db/water/italy_${today}.csv`,
    },
  ];
}
