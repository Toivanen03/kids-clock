const sleepStart = 20;
const sleepEnd = (sleepStart + 8);

export const clockConfig = {
    cx: 100,
    cy: 100,
    r: 100,
    sectors: {
        sleep: { sleepStart, sleepEnd, color: "red" },
    }
};

export const getSectorPath = (startHour: number, endHour: number) => {
    const { cx, cy, r } = clockConfig;

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