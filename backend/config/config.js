import dotenv from 'dotenv'
import { __dirname } from '../serving.js'
dotenv.config({ path: './config/config.env' })

const Config = {
  port: process.env.PORT,
}

export default Config
