//DO NOT USE THIS FILE FOR LEARNING CODING STANDARDS, THEY ARE MISSING HERE!
import express from "express"
import Config from "./config/config.js"
import cors from "cors"
import path from 'path'
import multer from 'multer'
import morgan from 'morgan'
import http from 'http'
import fs from "fs"
import { openDb, getExistingColumns } from './db/index.js';
import { __dirname } from './serving.js'

const app = express()

const storageDir = path.join(__dirname, 'storage')
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({ storage: storageConfig })
app.server = http.createServer(app)
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/img', express.static('storage'))

app.get('/', (req, res) => {
    return res.status(200).json({ version: '1.0' })
})

app.get('/car', async (req, res) => {
    const db = await openDb()
    const cars = await db.all('SELECT * FROM cars')
    res.json(cars)
})

app.post('/car', async (req, res) => {
    const {
        vin, image, manufacturer, model, constructionYear,
        mileage, engineSize, power, gearbox, fuelType, price,
        description, equipment
    } = req.body;
    const db = await openDb();
    const result = await db.run(
        'INSERT INTO cars (vin, image, manufacturer, model, constructionYear, mileage, engineSize, power, gearbox, fuelType, price, description, equipment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [vin, image, manufacturer, model, constructionYear, mileage, engineSize, power, gearbox, fuelType, price, description, equipment]
    );
    const newCar = { id: result.lastID, vin, image, manufacturer, model, constructionYear, mileage, engineSize, power, gearbox, fuelType, price, description, equipment };
    res.status(201).json(newCar);
});

app.get('/car', async (req, res) => {
    const filePath = path.join(__dirname, 'data.jsonc')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file')
            return;
        }

        res.json(JSON.parse(data))
    })
})

app.delete('/car/:id', async (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const db = await openDb();
    const result = await db.run('DELETE FROM cars WHERE id = ?', carId);

    if (result.changes === 0) {
        res.status(404).send('Car not found');
        return;
    }

    res.status(204).send();
});

app.put('/car/:id', async (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const db = await openDb();

    const existingCar = await db.get('SELECT * FROM cars WHERE id = ?', carId);
    if (!existingCar) {
        res.status(404).send('Car not found');
        return;
    }

    const existingColumns = await getExistingColumns(db);

    const updates = [];
    const params = [];
    for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && existingColumns.includes(key)) {
            updates.push(`${key} = ?`);
            params.push(req.body[key]);
        }
    }

    if (updates.length === 0) {
        res.status(400).send('No valid fields provided for update');
        return;
    }

    params.push(carId);
    const query = `UPDATE cars SET ${updates.join(', ')} WHERE id = ?`;
    const result = await db.run(query, params);

    if (result.changes === 0) {
        res.status(404).send('Car not found');
        return;
    }

    const updatedCar = { ...existingCar, ...req.body, id: carId };
    res.json(updatedCar);
});

app.post('/images/upload', upload.array('files'), async (req, res, next) => {
    let uploadedFiles = []

    for (let index = 0; index < req.files.length; index++) {
        const fileObj = req.files[index]
        console.log(fileObj)

        uploadedFiles.push(fileObj.filename)
    }

    return res.json({
        files: uploadedFiles,
    })
})

app.listen(Config.port, () => {
    console.log(`Listening on port ${Config.port}`)
})
