export const toDecimalHours = (time: { hours: number; minutes: number }) =>
    time.hours + time.minutes / 60;

export const decimalToTime = (decimalHours: number) => {
    const hours = Math.floor(decimalHours);
    const minutes = String(Math.round((decimalHours - hours) * 60)).padStart(2, "0");
    return `${hours}.${minutes}`;
};