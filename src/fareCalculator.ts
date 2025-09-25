import {Zone, ZoneFares, WEEKLY_CAP, DAILY_CAP, ValidZones } from "./zoneFares";    
import { getZone, getWeekStart, dayKey, getWeekEnd } from "./utils";
import { isPeakHour } from "./peakHours";

export interface Journey { // default journey details
    datetime: Date;
    fromZone: number;
    toZone: number;
}

export interface JourneyRecord extends Journey { // extended journey details with fare info
    fareApplied: number;
    fareCharged: number;
}

export function JourneyFare(journey: Journey): number { // calculate fare for a single journey
    const zone = getZone(journey.fromZone, journey.toZone);
    const peak = isPeakHour(journey.datetime);
    return peak ? ZoneFares.peak[zone] : ZoneFares.offpeak[zone];
}

export function FareCalculator(journeys : Journey[]) : number { // class to manage fare calculation and caps
    if (journeys.length === 0) return 0;

    for (const journey of journeys) {
        // Validate journey data
        if (!(journey.datetime instanceof Date) || isNaN(journey.datetime.getTime())) {
            throw new Error("Invalid datetime in journey data.");
        }

        if (!journey.datetime || typeof journey.fromZone !== 'number' || typeof journey.toZone !== 'number') {
            throw new Error("Invalid journey data format.");
        }

        if (!ValidZones.includes(journey.fromZone) || !ValidZones.includes(journey.toZone)) {
            throw new Error("Invalid zone information in journey data.");
        }
    }
    
    const journeyRecords: JourneyRecord[] = [];
    const dailyTotals: Record<string, number> = {};
    const weeklyTotals: Record<string, number> = {};
    let highestDailyCap = 0;
    let highestWeeklyCap = 0;

    const minDate = new Date(Math.min(...journeys.map((j) => j.datetime.getTime())));
    const weekStart = getWeekStart(minDate).toISOString();
    const weekEnd = getWeekEnd(minDate).toISOString();

    for (const journey of journeys.filter(j => j.datetime.toISOString() >= weekStart && j.datetime.toISOString() <= weekEnd).sort((a, b) => a.datetime.getTime() - b.datetime.getTime())) {
        const fare = JourneyFare(journey);
        const day = dayKey(journey.datetime);
        //const weekStart = getWeekStart(journey.date).toISOString();
        const zone = getZone(journey.fromZone, journey.toZone);
        const dailyCap = DAILY_CAP[zone];
        if (dailyCap !== undefined && dailyCap > highestDailyCap) {
            highestDailyCap = dailyCap; //get highest daily cap for zone in journeys
        }
        const weeklyCap = WEEKLY_CAP[zone];
        if (weeklyCap !== undefined && weeklyCap > highestWeeklyCap) {
            highestWeeklyCap = weeklyCap; //get highest weekly cap for zone in journeys
        }

        const dailyTotal = dailyTotals[day] || 0;
        const weeklyTotal = weeklyTotals[weekStart] || 0;
        let fareToCharge = fare;

        if (dailyTotal >= highestDailyCap) {
            fareToCharge = 0;
        } else if (dailyTotal + fare > highestDailyCap) {
            fareToCharge = dailyCap - dailyTotal;
        }
        
        if (weeklyTotal >= highestWeeklyCap) {
            fareToCharge = 0;
        } else if (weeklyTotal + fareToCharge > highestWeeklyCap) {
            fareToCharge = highestWeeklyCap - weeklyTotal;
        }

        journeyRecords.push({ ...journey, fareApplied: fare, fareCharged: fareToCharge });
        dailyTotals[day] = (dailyTotals[day] || 0) + fareToCharge;
        weeklyTotals[weekStart] = (weeklyTotals[weekStart] || 0) + fareToCharge;
    }

    return journeyRecords.reduce((sum, record) => sum + record.fareCharged, 0);
}
