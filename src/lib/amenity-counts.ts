import DB from "better-sqlite3";
import path from "path";

export type AmenityCounts = {
  fountains: number;
  bicycleParkings: number;
  toilets: number;
  playgrounds: number;
  total: number;
};

export function getAmenityCounts(): AmenityCounts {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    // Get count of fountains/water stations
    const fountainsResult = db
      .prepare("SELECT COUNT(*) as count FROM stations")
      .get() as { count: number };
    const fountains = fountainsResult.count;

    // Get count of bicycle parkings
    const bicycleParkingsResult = db
      .prepare("SELECT COUNT(*) as count FROM bicycle_parkings")
      .get() as { count: number };
    const bicycleParkings = bicycleParkingsResult.count;

    // Get count of toilets
    const toiletsResult = db
      .prepare("SELECT COUNT(*) as count FROM toilets")
      .get() as { count: number };
    const toilets = toiletsResult.count;

    // Get count of playgrounds
    const playgroundsResult = db
      .prepare("SELECT COUNT(*) as count FROM playgrounds")
      .get() as { count: number };
    const playgrounds = playgroundsResult.count;

    const total = fountains + bicycleParkings + toilets + playgrounds;

    return {
      fountains,
      bicycleParkings,
      toilets,
      playgrounds,
      total,
    };
  } finally {
    db.close();
  }
}
