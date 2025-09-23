export function isPeakHour(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (day >= 1 && day <= 5) { // Monday to Friday
        // Morning peak hours: 7:00 AM to 10:30 AM
        if (hour >= 7 && (hour < 10 || (hour === 10 && minute < 30))) {
            return true;
        }
        // Evening peak hours: 5:00 PM to 8:00 PM
        if (hour >= 17 && hour < 20) {
            return true;
        }
    }

    if(day === 6 || day === 0) { // Saturday and Sunday
        // Morning peak hours: 9:00 AM to 11:00 AM
        if (hour >= 9 && hour < 11) {
            return true;
        }
        // Evening peak hours: 6:00 PM to 10:00 PM
        if (hour >= 18 && hour < 22) {
            return true;
        }
    }
    return false; // Off-peak hours
}