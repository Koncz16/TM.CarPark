import fs from 'fs';
import path from 'path';
import { openDb } from './index.js';

async function populateDb() {
  const db = await openDb();

  const filePath = path.resolve('data.jsonc');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const cars = JSON.parse(jsonData);

  for (const car of cars) {
    const {
      vin, image, manufacturer, model, constructionYear,
      mileage, engineSize, power, gearbox, fuelType, price,
      description, equipment
    } = car;
    await db.run(
      'INSERT INTO cars (vin, image, manufacturer, model, constructionYear, mileage, engineSize, power, gearbox, fuelType, price, description, equipment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [vin, image, manufacturer, model, constructionYear, mileage, engineSize, power, gearbox, fuelType, price, description, equipment]
    );
  }

  console.log('Database populated successfully!');
}

populateDb().catch(err => {
  console.error('Error populating database:', err);
});
