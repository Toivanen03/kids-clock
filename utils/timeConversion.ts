export const toDecimalHours = (time: { hours: number; minutes: number }) =>
    time.hours + time.minutes / 60;