import fs from "fs";
import path from "path";

/**
 * Finds the project root by looking for package.json
 */
function findProjectRoot(startDir: string): string {
  let currentDir = startDir;

  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, "package.json"))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  throw new Error("Could not find project root (package.json not found)");
}

/**
 * Gets the latest data file for a given entity type
 * @param entityType The type of entity (e.g., 'bicycleParking', 'toilets', 'playgrounds', 'water')
 * @returns The path to the latest data file
 */
export function getLatestDataFile(entityType: string): string {
  const projectRoot = findProjectRoot(__dirname);
  const dataDir = path.join(projectRoot, "db", entityType);

  if (!fs.existsSync(dataDir)) {
    throw new Error(`Data directory not found: ${dataDir}`);
  }

  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.startsWith("italy_") && file.endsWith(".csv"))
    .sort()
    .reverse(); // Get the most recent file

  if (files.length === 0) {
    throw new Error(`No Italy ${entityType} data files found in ${dataDir}`);
  }

  return path.join(dataDir, files[0]);
}
