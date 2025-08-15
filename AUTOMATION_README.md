# Automated POI Data Download and Database Preparation

This project now includes automated downloading of Point of Interest (POI) data from OpenStreetMap via the Overpass API.

## Overview

The automation system consists of:

1. **Overpass API Downloader** (`src/lib/overpass-downloader.ts`) - Handles downloading data from Overpass API
2. **Download Script** (`scripts/download-overpass-data.ts`) - Standalone script to download data
3. **Updated Library Files** - Automatically use the latest downloaded data files
4. **Enhanced Database Preparation** (`src/db/prepare-db.ts`) - Now includes automatic downloading

## Available Commands

### Download Data Only

```bash
npm run download-data
```

This downloads the latest POI data from Overpass API for all categories:

- Bicycle parkings
- Toilets
- Playgrounds
- Water stations (fountains and water taps)

### Prepare Database (Full Automation)

```bash
npm run prepare-db
```

This command now:

1. Downloads the latest POI data from Overpass API
2. Creates a fresh SQLite database
3. Populates it with the downloaded data

## What Gets Downloaded

The system downloads POI data for the entire Italy from OpenStreetMap:

### Bicycle Parkings

- Query: `amenity=bicycle_parking`
- Fields: id, covered, indoor, access, fee, bicycle_parking type, surveillance, capacity, coordinates

### Toilets

- Query: `amenity=toilets`
- Fields: id, fee, opening_hours, changing_table, coordinates

### Playgrounds

- Query: `leisure=playground`
- Fields: id, name, opening_hours, indoor, fee, supervised, coordinates

### Water Stations

- Query: `amenity=drinking_water` OR `man_made=water_tap`
- Fields: id, name, coordinates

## File Organization

Downloaded files are automatically saved with timestamps:

- `db/bicycleParking/italy_YYYYMMDD.csv`
- `db/toilets/italy_YYYYMMDD.csv`
- `db/playgrounds/italy_YYYYMMDD.csv`
- `db/water/italy_YYYYMMDD.csv`

The system automatically uses the most recent file for each category.

## Rate Limiting

The downloader includes a 1-second delay between requests to be respectful to the Overpass API servers.

## Error Handling

- Checks for API response errors
- Creates directories if they don't exist
- Provides clear error messages
- Validates downloaded data before processing

## Manual Override

If you need to use specific data files, you can still place them manually in the appropriate directories. The system will automatically use the most recent file based on the filename timestamp.

## Troubleshooting

### Download Issues

- Check your internet connection
- The Overpass API might be temporarily unavailable
- Large datasets (like all of Italy) can take several minutes to download

### File Not Found Errors

- Ensure the download completed successfully
- Check that the directories exist: `db/bicycleParking/`, `db/toilets/`, `db/playgrounds/`, `db/water/`

### Database Issues

- Make sure you have write permissions in the `db/` directory
- Ensure SQLite is properly installed
- Check that all dependencies are installed: `npm install`
