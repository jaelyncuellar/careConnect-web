
import fs from "fs"; 
import path from "path"; 
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "..", "data"); 

export function readData(fileName) { 
    const filePath = path.join(dataPath, fileName); 
    const raw = fs.readFileSync(filePath, "utf-8"); 
    return JSON.parse(raw);
} 

export function writeData(fileName, data) { 
    const filePath = path.join(dataPath, fileName); 
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
}