import { FareCalculator, Journey } from "../fareCalculator";

const weekDateTime = (date: string, time: string) => new Date(`${date}T${time}`);
/* ============================================================================================
WEEKDAY TEST CASES - ZONE 1, ZONE 2, ZONE 1 & 2 - DAILY CAPS - PARTIAL CHARGING WHEN MID-DAY CAP IS REACHED
- Monday to Friday 07:00 - 10:30 and 17:00 - 20:00 are peak hours
 ============================================================================================*/
const weekDayDate = '2025-09-22'; // Monday
const weekDayDateTime = (time: string) => weekDateTime(weekDayDate, time);
describe("Daily caps Weekday", () => {
    describe("Zone 1 & 2", () => {
        test('Daily caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('06:30:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
                { datetime: weekDayDateTime('10:20:00'), fromZone: 2, toZone: 1}, // Peak - 35
                { datetime: weekDayDateTime('10:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
            ];

            //const records = FareCalculator(journeys);
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(90); // 90 total fare, daily cap not reached
        });

        test('Daily caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('06:30:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
                { datetime: weekDayDateTime('10:20:00'), fromZone: 2, toZone: 1}, // Peak - 35
                { datetime: weekDayDateTime('10:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekDayDateTime('14:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekDayDateTime('15:00:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
                { datetime: weekDayDateTime('18:00:00'), fromZone: 2, toZone: 1}, // Peak - 35
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(120); // 120 daily cap applied for zone 1-2
        });
    });

    describe("Zone 1", () => {
        test('Daily caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('06:30:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekDayDateTime('10:20:00'), fromZone: 1, toZone: 1}, // Peak - 30
                { datetime: weekDayDateTime('10:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(80); // 80 total fare, daily cap not reached
        });

        test('Daily caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('06:30:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekDayDateTime('10:20:00'), fromZone: 1, toZone: 1}, // Peak - 30
                { datetime: weekDayDateTime('10:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekDayDateTime('17:00:00'), fromZone: 1, toZone: 1}, // Peak - 30
                { datetime: weekDayDateTime('19:00:00'), fromZone: 1, toZone: 1}, // Peak - 30
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(100); // 100 daily cap applied for zone 1
        });
    });

    describe("Zone 2", () => {
        test('Daily caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('06:30:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20
                { datetime: weekDayDateTime('10:20:00'), fromZone: 2, toZone: 2}, // Peak - 25
                { datetime: weekDayDateTime('10:45:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20        
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(65); // 65 total fare, daily cap not reached
        });

        test('Daily caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('06:30:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20
                { datetime: weekDayDateTime('10:20:00'), fromZone: 2, toZone: 2}, // Peak - 25
                { datetime: weekDayDateTime('10:45:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20        
                { datetime: weekDayDateTime('18:45:00'), fromZone: 2, toZone: 2}, // Peak - 25 // Daily cap reached here - 80
                { datetime: weekDayDateTime('19:00:00'), fromZone: 2, toZone: 2}, // Peak - 25 // No charge, daily cap already hit
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(80);
        });
    });
});

/* ============================================================================================
WEEKEND TEST CASES - ZONE 1, ZONE 2, ZONE 1 & 2 - DAILY CAPS - PARTIAL CHARGING WHEN MID-DAY CAP IS REACHED
- Saturday and Sunday - 09:00 - 11:00 and 18:00 - 22:00 are peak hours
 ============================================================================================*/
 const weekEndDate = '2025-09-20'; // Saturday
 const weekEndDateTime = (time: string) => weekDateTime(weekEndDate, time);

describe("Daily caps Weekend", () => {
    describe("Zone 1 & 2", () => {
        test('Daily caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekEndDateTime('08:30:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
                { datetime: weekEndDateTime('10:20:00'), fromZone: 2, toZone: 1}, // Peak - 35
                { datetime: weekEndDateTime('11:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(90); // 90 total fare, daily cap not reached
        });

        test('Daily caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekEndDateTime('06:30:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
                { datetime: weekEndDateTime('10:20:00'), fromZone: 2, toZone: 1}, // Peak - 35
                { datetime: weekEndDateTime('11:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekEndDateTime('14:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekEndDateTime('15:00:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
                { datetime: weekEndDateTime('18:00:00'), fromZone: 2, toZone: 1}, // Peak - 35
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(120); // 120 daily cap applied for zone 1-2
        });
    });

    describe("Zone 1", () => {
        test('Daily caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekEndDateTime('06:30:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekEndDateTime('10:20:00'), fromZone: 1, toZone: 1}, // Peak - 30
                { datetime: weekEndDateTime('11:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(80); // 80 total fare, daily cap not reached
        });

        test('Daily caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekEndDateTime('06:30:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekEndDateTime('10:20:00'), fromZone: 1, toZone: 1}, // Peak - 30
                { datetime: weekEndDateTime('11:45:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
                { datetime: weekEndDateTime('18:00:00'), fromZone: 1, toZone: 1}, // Peak - 30
                { datetime: weekEndDateTime('19:00:00'), fromZone: 1, toZone: 1}, // Peak - 30
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(100); // 100 daily cap applied for zone 1
        });
    });

    describe("Zone 2", () => {
        test('Daily caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekEndDateTime('06:30:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20
                { datetime: weekEndDateTime('10:20:00'), fromZone: 2, toZone: 2}, // Peak - 25
                { datetime: weekEndDateTime('11:45:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20        
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(65); // 65 total fare, daily cap not reached
        });

        test('Daily caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                { datetime: weekEndDateTime('06:30:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20
                { datetime: weekEndDateTime('10:20:00'), fromZone: 2, toZone: 2}, // Peak - 25
                { datetime: weekEndDateTime('11:45:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20        
                { datetime: weekEndDateTime('18:45:00'), fromZone: 2, toZone: 2}, // Peak - 25 // Daily cap reached here - 80
                { datetime: weekEndDateTime('19:00:00'), fromZone: 2, toZone: 2}, // Peak - 25 // No charge, daily cap already hit
            ];

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(80);
        });
    });
});

/* ============================================================================================
WEEKLY TEST CASES - ZONE 1, ZONE 2, ZONE 1 & 2 - WEEKLY CAPS - PARTIAL CHARGING WHEN MID-WEEK CAP IS REACHED
- Monday to Friday 07:00 - 10:30 and 17:00 - 20:00 are peak hours
- Saturday and Sunday - 09:00 - 11:00 and 18:00 - 22:00 are peak hours
 ============================================================================================*/
describe("Weekly Caps", () => {
    describe("Zone 1 & 2", () => {
        test('Weekly caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                // Week-1 Monday
                { datetime: weekDateTime('2025-09-15','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-15','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-15','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-15','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-15','19:00:00'), fromZone: 1, toZone: 2 },
            
                // Week-1 Tuesday
                { datetime: weekDateTime('2025-09-16','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-16','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-16','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-16','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-16','19:00:00'), fromZone: 1, toZone: 2 },
            
                // Week-1 Wednesday
                { datetime: weekDateTime('2025-09-17','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-17','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-17','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-17','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-17','19:00:00'), fromZone: 1, toZone: 2 },
            
                // Week-1 Thursday
                { datetime: weekDateTime('2025-09-18','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-18','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-18','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-18','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-18','19:00:00'), fromZone: 1, toZone: 2 },
            
                // Week-1 Friday
                { datetime: weekDateTime('2025-09-19','10:20:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-19','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-19','16:15:00'), fromZone: 1, toZone: 1 },
            
                // Week-1 Saturday
                { datetime: weekDateTime('2025-09-20','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-20','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-20','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-20','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-20','19:00:00'), fromZone: 1, toZone: 2 },
            
                // Week-1 Sunday
                { datetime: weekDateTime('2025-09-21','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-21','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-21','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-21','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-21','19:00:00'), fromZone: 1, toZone: 2 },
            
                // Week-2 Monday
                { datetime: weekDateTime('2025-09-22','10:20:00'), fromZone: 2, toZone: 1 },
                { datetime: weekDateTime('2025-09-22','10:45:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-22','16:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-22','18:15:00'), fromZone: 1, toZone: 1 },
                { datetime: weekDateTime('2025-09-22','19:00:00'), fromZone: 1, toZone: 2 },
            ];      

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(600);
        });

        test('Weekly caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                // Week-1 Monday
                { datetime: weekDateTime('2025-09-15','10:20:00'), fromZone: 2, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-15','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-15','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Tuesday
                { datetime: weekDateTime('2025-09-16','10:20:00'), fromZone: 2, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-16','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Wednesday
                { datetime: weekDateTime('2025-09-17','10:20:00'), fromZone: 2, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-17','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-17','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Thursday
                { datetime: weekDateTime('2025-09-18','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Friday
            
                // Week-1 Saturday
                { datetime: weekDateTime('2025-09-20','10:20:00'), fromZone: 1, toZone: 2 },// Peak - 35
                { datetime: weekDateTime('2025-09-20','10:45:00'), fromZone: 2, toZone: 1 },// Peak - 35
            
                // Week-1 Sunday
                { datetime: weekDateTime('2025-09-21','10:20:00'), fromZone: 2, toZone: 1 },// Peak - 35
                
                // Week-2 Monday
                { datetime: weekDateTime('2025-09-22','10:20:00'), fromZone: 2, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-22','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-22','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-22','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-22','19:00:00'), fromZone: 1, toZone: 2 },// Peak - 35
            ];      

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(360);
        });
    });

    describe("Zone 1", () => {
        test('Weekly caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                // Week-1 Monday
                { datetime: weekDateTime('2025-09-15','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-15','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-15','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-15','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-15','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Tuesday
                { datetime: weekDateTime('2025-09-16','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-16','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-16','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-16','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-16','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Wednesday
                { datetime: weekDateTime('2025-09-17','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-17','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-17','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-17','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-17','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Thursday
                { datetime: weekDateTime('2025-09-18','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-18','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-18','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-18','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-18','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Friday
                { datetime: weekDateTime('2025-09-19','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-19','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-19','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Saturday
                { datetime: weekDateTime('2025-09-20','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-20','10:45:00'), fromZone: 1, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-20','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-20','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-20','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 35
            
                // Week-1 Sunday
                { datetime: weekDateTime('2025-09-21','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-21','10:45:00'), fromZone: 1, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-21','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-21','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 35
                { datetime: weekDateTime('2025-09-21','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 35
            
                // Week-2 Monday
                { datetime: weekDateTime('2025-09-22','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-22','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-22','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-22','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-22','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 30
            ];      

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(500);
        });

        test('Weekly caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                // Week-1 Monday
                { datetime: weekDateTime('2025-09-15','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-15','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Tuesday
                { datetime: weekDateTime('2025-09-16','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Wednesday
                { datetime: weekDateTime('2025-09-17','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-17','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-17','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Thursday
                { datetime: weekDateTime('2025-09-18','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-18','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Friday
                { datetime: weekDateTime('2025-09-19','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-19','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-19','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
            
                // Week-1 Saturday
                { datetime: weekDateTime('2025-09-20','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-20','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-1 Sunday
                { datetime: weekDateTime('2025-09-21','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-21','10:45:00'), fromZone: 1, toZone: 1 },// Peak - 30
            
                // Week-2 Monday
                { datetime: weekDateTime('2025-09-22','10:20:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-22','10:45:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-22','16:15:00'), fromZone: 1, toZone: 1 },// Off-Peak - 25
                { datetime: weekDateTime('2025-09-22','18:15:00'), fromZone: 1, toZone: 1 },// Peak - 30
                { datetime: weekDateTime('2025-09-22','19:00:00'), fromZone: 1, toZone: 1 },// Peak - 30
            ];      

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(415);
        });
    });

    describe("Zone 2", () => {
        test('Weekly caps reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                // Week-1 Monday
                { datetime: weekDateTime('2025-09-15','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-15','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-15','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-15','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-15','19:00:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Tuesday
                { datetime: weekDateTime('2025-09-16','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-16','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-16','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-16','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-16','19:00:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Wednesday
                { datetime: weekDateTime('2025-09-17','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-17','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-17','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-17','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-17','19:00:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Thursday
                { datetime: weekDateTime('2025-09-18','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-18','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-18','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-18','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-18','19:00:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Friday
                { datetime: weekDateTime('2025-09-19','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-19','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-19','16:15:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Saturday
                { datetime: weekDateTime('2025-09-20','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-20','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-20','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-20','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-20','19:00:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Sunday
                { datetime: weekDateTime('2025-09-21','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-21','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-21','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-21','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-21','19:00:00'), fromZone: 2, toZone: 2 },
            
                // Week-2 Monday
                { datetime: weekDateTime('2025-09-22','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','19:00:00'), fromZone: 2, toZone: 2 },
            ];      

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(400);
        });

        test('Weekly caps not reached - FareCalculator applies correctly', () => {
            const journeys: Journey[] = [
                // Week-1 Monday
                { datetime: weekDateTime('2025-09-15','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-15','10:45:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Tuesday
                { datetime: weekDateTime('2025-09-16','10:20:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Wednesday
                { datetime: weekDateTime('2025-09-17','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-17','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-17','16:15:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Thursday
                { datetime: weekDateTime('2025-09-18','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-18','18:15:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Friday
                { datetime: weekDateTime('2025-09-19','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-19','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-19','16:15:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Saturday
                { datetime: weekDateTime('2025-09-20','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-20','18:15:00'), fromZone: 2, toZone: 2 },
            
                // Week-1 Sunday
                { datetime: weekDateTime('2025-09-21','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-21','10:45:00'), fromZone: 2, toZone: 2 },
            
                // Week-2 Monday
                { datetime: weekDateTime('2025-09-22','10:20:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','10:45:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','16:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','18:15:00'), fromZone: 2, toZone: 2 },
                { datetime: weekDateTime('2025-09-22','19:00:00'), fromZone: 2, toZone: 2 },
            ];      

            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(340);
        });
    });
});


/* ============================================================================================
Invalid journey data - ZONE 1, ZONE 2, ZONE 1 & 2
 ============================================================================================*/
 describe("Invalid journey data", () => {
    test('Empty journey list - FareCalculator returns 0 fare', () => {
        const journeys: Journey[] = [];
        const totalFare = FareCalculator(journeys);
        expect(totalFare).toBe(0);
    });
    test('Journey with invalid fromZone - FareCalculator throws error', () => {
        const journeys: Journey[] = [
            { datetime: weekDayDateTime('10:00:00'), fromZone: 3, toZone: 1}, // Invalid fromZone
        ];
        expect(() => FareCalculator(journeys)).toThrow("Invalid zone information in journey data.");
    });
    test('Journey with invalid toZone - FareCalculator throws error', () => {
        const journeys: Journey[] = [
            { datetime: weekDayDateTime('10:00:00'), fromZone: 1, toZone: 3}, // Invalid toZone
        ];
        expect(() => FareCalculator(journeys)).toThrow("Invalid zone information in journey data.");
    });
    test('Journey with missing datetime - FareCalculator throws error', () => {
        const journeys: Journey[] = [
            { datetime: null as any, fromZone: 1, toZone: 2}, // Missing datetime
        ];
        expect(() => FareCalculator(journeys)).toThrow("Invalid datetime in journey data.");
    });
    test('Journey with invalid datetime - FareCalculator throws error', () => {
        const journeys: Journey[] = [
            { datetime: new Date("invalid-date"), fromZone: 1, toZone: 2}, // Invalid datetime
        ];
        expect(() => FareCalculator(journeys)).toThrow("Invalid datetime in journey data.");
    });
});

/* ============================================================================================
CHECKED BOUNDRY TEST CASES - ZONE 1, ZONE 2, ZONE 1 & 2
 ============================================================================================*/
 describe("Boundary Cases", () => {
    describe("Zone 1 & 2", () => {
        test('Single journey on the boundary of peak - FareCalculator applies peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('07:00:00'), fromZone: 1, toZone: 2}, // Peak - 35
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(35);
        });

        test('Single journey on the boundary of off-peak - FareCalculator applies off-peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('10:30:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(30);
        });
        test('Single journey on the boundary of peak - FareCalculator applies peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('17:00:00'), fromZone: 1, toZone: 2}, // Peak - 35
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(35);
        });
        test('Single journey on the boundary of off-peak - FareCalculator applies off-peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('20:00:00'), fromZone: 1, toZone: 2}, // Off-Peak - 30
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(30);
        });
    });

    describe("Zone 1", () => {
        test('Single journey on the boundary of peak - FareCalculator applies peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('07:00:00'), fromZone: 1, toZone: 1}, // Peak - 30
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(30);
        });
        test('Single journey on the boundary of peak - FareCalculator applies off-peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('10:30:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(25);
        });
        test('Single journey on the boundary of peak - FareCalculator applies peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('17:00:00'), fromZone: 1, toZone: 1}, // Peak - 30
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(30);
        });
        test('Single journey on the boundary of off-peak - FareCalculator applies off-peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('20:00:00'), fromZone: 1, toZone: 1}, // Off-Peak - 25
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(25);
        });
    });
    describe("Zone 2", () => {
        test('Single journey on the boundary of peak - FareCalculator applies peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('07:00:00'), fromZone: 2, toZone: 2}, // Peak - 25
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(25);
        });

        test('Single journey on the boundary of off-peak - FareCalculator applies off-peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('10:30:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(20);
        });
        test('Single journey on the boundary of peak - FareCalculator applies peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('17:00:00'), fromZone: 2, toZone: 2}, // Peak - 25
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(25);
        });
        test('Single journey on the boundary of off-peak - FareCalculator applies off-peak fare', () => {
            const journeys: Journey[] = [
                { datetime: weekDayDateTime('20:00:00'), fromZone: 2, toZone: 2}, // Off-Peak - 20
            ]; 
            const totalFare = FareCalculator(journeys);
            expect(totalFare).toBe(20);
        });
    });
});