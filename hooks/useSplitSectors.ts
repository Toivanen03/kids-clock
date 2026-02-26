import { Sector, Weekday } from "../types/types";
import { useSettings } from "./useSettings";

const useSplitSectors = (selectedDay: Weekday): [Sector[], Sector[]] => {
  const { sectors } = useSettings();

  const sectorsToShow: Sector[] = sectors
    .map(s => {
      const daySchedules = s.activeDays.filter(d => d.day === selectedDay);
      if (daySchedules.length === 0) return null;
      return { ...s, activeDays: daySchedules };
    })
    .filter((s): s is Sector => s !== null);

  const [amEvents, pmEvents]: [Sector[], Sector[]] = sectorsToShow.reduce<[Sector[], Sector[]]>(
    (acc, s) => {
      s.activeDays.forEach(d => {
        if (d.start < 12) {
          if (d.end > 12) {
            acc[0].push({ ...s, activeDays: [{ ...d, end: 12 }] });
            acc[1].push({ ...s, activeDays: [{ ...d, start: 12 }] });
          } else {
            acc[0].push({ ...s, activeDays: [d] });
          }
        } else {
          if (d.start > 12 && d.end < d.start) {
            acc[0].push({ ...s, activeDays: [{ ...d, start: 0 }] });
            acc[1].push({ ...s, activeDays: [{ ...d, end: 24 }] });
          } else {
            acc[1].push({ ...s, activeDays: [d] });
          }
        }
      });
      return acc;
    },
    [[], []]
  );

  return [amEvents, pmEvents];
};

export default useSplitSectors;