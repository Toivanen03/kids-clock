import { Sector } from "../types/types";

export const clockLayout = {
    cx: 100,
    cy: 100,
    r: 98,
};

export const getSectorPath = (startHour: number, endHour: number) => {
    const { cx, cy, r } = clockLayout;

    const startAngle = ((startHour % 12) / 12) * 2 * Math.PI - Math.PI/2;
    const endAngle   = ((endHour % 12) / 12) * 2 * Math.PI - Math.PI/2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const diff = (endAngle - startAngle + 2*Math.PI) % (2*Math.PI);
    const largeArcFlag = diff > Math.PI ? 1 : 0;
    const sweepFlag = 1;

    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;
};

export const splitSectorForClock = ( sector: Sector, now: Date, isAM: boolean, preview: boolean ) => {
    const currentHour = now.getHours() + now.getMinutes() / 60;
    const pastMidnight = sector.end <= sector.start;
    const onGoing = sector.start < currentHour;
    const upComing = currentHour < sector.start;
    const finished = sector.end < currentHour;
    const middayEvent = sector.start <= 12 && sector.end > 12;

    if (!sector.visible) return [];

    if (pastMidnight) {
        const sleepStart = !onGoing && !finished ? currentHour : 0;
        const part1 = { ...sector, start: onGoing ? currentHour : sector.start, end: 24 };
        const part2 = { ...sector, start: sleepStart, end: sector.end };

        if (preview) return [part1];
        return !finished && isAM ? [part2] : [part1];
    }

    if (finished) return [];

    if (upComing) {
        if (middayEvent) {
            const adjustedEnd = Math.min(currentHour + 12, sector.end);
            return [{ ...sector, start: sector.start, end: adjustedEnd }];
        }

        return [sector];
    }

    return [{ ...sector, start: currentHour, end: sector.end }];
};