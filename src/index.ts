import fs from 'fs';
import path from 'path';
import { FareCalculator , Journey} from './fareCalculator';

const journeysFilePath = path.join(__dirname, '../data/journeys.json');
const journeysData = fs.readFileSync(journeysFilePath, 'utf-8');

if (!journeysData) {
    console.error('No journey data found.');
    process.exit(1);
}
//const journeys : Journey[] = JSON.parse(journeysData);
const journeys = JSON.parse(journeysData).map((j: any) => ({
    ...j,
    datetime: new Date(j.datetime),  // convert to Date object
  }));

const totalFare = FareCalculator(journeys);
console.log(`Output: ${totalFare}`);