import { Time, Sector, Weekday, DaySchedule, weekdays } from "../types/types";

export const getOnGoingAndNext = (time: Time, events: Sector[], sectors: Sector[], currentWeekday: Weekday) => {
    const now = time.hours + time.minutes / 60 + time.seconds / 3600;

    const isActiveNow = (e: DaySchedule) => {
        if (e.start <= e.end) {
            return e.start <= now && now < e.end;
        }
        return now >= e.start || now < e.end;
    };

    const sectorEvents = sectors.filter(s =>
        events.some(e => e.id === s.id)
    );

    const prevWeekday = weekdays[(weekdays.indexOf(currentWeekday) + 7) % 7];

    const allDays: DaySchedule[] = sectorEvents.flatMap(s =>
        s.activeDays
            .filter(d =>
                d.day === currentWeekday ||
                (d.day === prevWeekday && d.start > d.end)
            )
            .map(d => ({
                day: d.day,
                start: d.start,
                end: d.end,
                name: s.name
            }))
    );

    const sorted = allDays.slice().sort((a, b) => a.start - b.start);

    const ongoing = sorted.find(isActiveNow);
    const pastMidnight = ongoing && (ongoing.end < ongoing.start);
    const disabled = ongoing && pastMidnight && (ongoing.start < now);

    let next = sorted.find(e => e.start > now && e.day === currentWeekday);

    if (!next) {
        next = sorted.find(e => e.day !== currentWeekday);
    }

    return { ongoing, next: !disabled ? next : null };
};