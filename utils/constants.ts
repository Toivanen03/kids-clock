import { settings } from "./settings";
import { Sector } from "../types/types";

export const clockLayout = {
    cx: 100,
    cy: 100,
    r: 98,
};

export const dailySectors: Sector[] = [
    {
        visible: settings.sleep.visible,
        name: "sleep",
        start: settings.sleep.start,
        end: settings.sleep.end,
        color: "red"
    },
    {
        visible: settings.school.visible,
        name: "school",
        start: settings.school.start,
        end: settings.school.end,
        color: "yellow"
    },
    {
        visible: settings.hobby.visible,
        name: "hobby",
        start: settings.hobby.start,
        end: settings.hobby.end,
        color: "blue"
    },
]

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

export const splitSectorForClock = (sector: Sector, isAM: boolean) => {
    const start = sector.start;
    const end = sector.end;

    const result: Sector[] = [];

    if (start < end) {
        if (isAM && end <= 12) result.push(sector);
        if (!isAM && start >= 12) result.push(sector);
    } else {
        if (isAM) {
            if (end > 0) result.push({ ...sector, start: 0, end: Math.min(end, 12) });
        } else {
            if (start < 24) result.push({ ...sector, start: Math.max(start, 12), end: 24 });
        }
    }

    return result;
};