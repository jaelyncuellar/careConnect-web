const fs = require("fs"); 
const path = require("path"); 

const dataPath = path.join(__dirname, "..", "data"); 

function readData(fileName) { 
    const filePath = path.join(dataPath, fileName); 
    const raw = fs.readFileSync(filePath,  "utf-8"); 
    return JSON.parse(raw); 
}

function writeData(fileName, data){ 
    const filePath = path.join(dataPath, fileName); 
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
}

module.exports = { 
    readData, 
    writeData
};
