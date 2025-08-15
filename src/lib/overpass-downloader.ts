import fs from "fs";
import path from "path";

export interface OverpassQuery {
  name: string;
  query: string;
  outputFile: string;
}

export class OverpassDownloader {
  private baseUrl = "https://overpass-api.de/api/interpreter";

  async downloadQuery(query: OverpassQuery): Promise<void> {
    console.log(`Downloading ${query.name}...`);

    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
        `Successfully downloaded ${query.name} to ${query.outputFile}`
      );
    } catch (error) {
      console.error(`Error downloading ${query.name}:`, error);
      throw error;
    }
  }

  async downloadAll(queries: OverpassQuery[]): Promise<void> {
    console.log(`Starting download of ${queries.length} queries...`);

    for (const query of queries) {
      await this.downloadQuery(query);
      // Add a small delay between requests to be respectful to the API
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
