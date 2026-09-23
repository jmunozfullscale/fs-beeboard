const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'js', 'app.js');
const dataDirPath = path.join(__dirname, 'data');
const gamesJsonPath = path.join(dataDirPath, 'games.json');

console.log('Starting Migration: Extracting gamesDatabase to external JSON...');

// 1. Read app.js
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// 2. Extract gamesDatabase array using Regex
const regex = /const gamesDatabase = (\[[\s\S]*?\]);/;
const match = appJsContent.match(regex);

if (!match) {
    console.error('Error: Could not find gamesDatabase in app.js');
    process.exit(1);
}

const gamesArrayString = match[1];

// Evaluate the string into a real JS array
let gamesData;
try {
    // using eval here safely since we control the source file
    gamesData = eval('(' + gamesArrayString + ')');
} catch (e) {
    console.error('Error parsing gamesDatabase array:', e);
    process.exit(1);
}

// 3. Write to games.json
if (!fs.existsSync(dataDirPath)){
    fs.mkdirSync(dataDirPath);
}
fs.writeFileSync(gamesJsonPath, JSON.stringify(gamesData, null, 2));
console.log(`Successfully wrote ${gamesData.length} games to data/games.json`);

// 4. Modify app.js: Replace hardcoded array with an empty let
appJsContent = appJsContent.replace(regex, 'let gamesDatabase = [];');

// 5. Modify app.js: Update DOMContentLoaded to use async fetch
const initRegex = /document\.addEventListener\('DOMContentLoaded', \(\) => {([\s\S]*?)renderLibraryGames\(gamesDatabase\);([\s\S]*?)}\);/;
const newInit = `document.addEventListener('DOMContentLoaded', async () => {$1
  try {
    const response = await fetch('data/games.json');
    gamesDatabase = await response.json();
    renderLibraryGames(gamesDatabase);
  } catch (error) {
    console.error('Error loading games data:', error);
  }$2});`;

appJsContent = appJsContent.replace(initRegex, newInit);

fs.writeFileSync(appJsPath, appJsContent);
console.log('Successfully updated app.js to fetch games asynchronously.');
console.log('Migration Complete.');
