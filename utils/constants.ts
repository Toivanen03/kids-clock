export const clockLayout = {
    cx: 100,
    cy: 100,
    r: 98,
};

export const sectorPath = () => {
    const angle = Math.PI / 4;

    const x1 = clockLayout.cx - Math.sin(angle) * clockLayout.r;
    const y1 = clockLayout.cy - Math.cos(angle) * clockLayout.r;
    const x2 = clockLayout.cx + Math.sin(angle) * clockLayout.r;
    const y2 = clockLayout.cy - Math.cos(angle) * clockLayout.r;

    const yTop = clockLayout.cy - clockLayout.r;
    const xOffset = Math.tan(angle) * clockLayout.r;
    const leftX  = clockLayout.cx - xOffset;
    const rightX = clockLayout.cx + xOffset;

    return {
        angle,
        x1,
        y1,
        x2,
        y2,
        yTop,
        leftX,
        rightX
    };
}

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