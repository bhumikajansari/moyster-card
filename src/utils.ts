import {Zone} from './zoneFares';

export function getZone(fromZone: number, toZone: number): Zone {
    return `${fromZone}-${toZone}` as Zone;
}

export function getWeekStart(date: Date): Date {
    const weekStart = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
}

export function getWeekEnd(date: Date): Date {
    const start = getWeekStart(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  }

export function dayKey(date: Date): string {
    const splitDate = date.toISOString().split('T');
    return splitDate[0] ?? '';
}