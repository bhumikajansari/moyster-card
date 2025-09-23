export const ValidZones = [1, 2];

export type Zone = '1-1' | '1-2' | '2-1' | '2-2';

export const ZoneFares = {
    peak: { '1-1': 30, '1-2': 35, '2-1':35, '2-2': 25 } as Record<Zone, number>,
    offpeak: { '1-1': 25, '1-2': 30, '2-1':30, '2-2': 20 } as Record<Zone, number>
};

export const DAILY_CAP: Record<Zone, number> = { '1-1': 100, '1-2': 120,'2-1': 120, '2-2': 80 };
export const WEEKLY_CAP: Record<Zone, number> = { '1-1': 500, '1-2': 600, '2-1': 600, '2-2': 400 };