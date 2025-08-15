#!/usr/bin/env npx tsx

import {
  OverpassDownloader,
  getOverpassQueries,
} from "../src/lib/overpass-downloader";

async function main() {
  const downloader = new OverpassDownloader();
  const queries = getOverpassQueries();

  console.log(
    "🚀 Starting automated download of Italy POI data from Overpass API..."
  );
  console.log(`📊 Will download ${queries.length} datasets:`);

  queries.forEach((query, index) => {
    console.log(`  ${index + 1}. ${query.name} -> ${query.outputFile}`);
  });

  console.log("");

  try {
    await downloader.downloadAll(queries);
    console.log("✅ All data downloaded successfully!");
    console.log("🔄 You can now run the database preparation script.");
  } catch (error) {
    console.error("❌ Download failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { main as downloadOverpassData };
