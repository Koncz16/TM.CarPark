import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function openDb() {
  return open({
    filename: './cars.db',
    driver: sqlite3.Database
  });
}

export async function getExistingColumns(db) {
  const columns = await db.all("PRAGMA table_info(cars)");
  return columns.map(column => column.name);
}

(async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vin TEXT,
      image TEXT,
      manufacturer TEXT,
      model TEXT,
      constructionYear TEXT,
      mileage TEXT,
      engineSize TEXT,
      power TEXT,
      gearbox TEXT,
      fuelType TEXT,
      price TEXT,
      description TEXT,
      equipment TEXT
    )
  `);
})();