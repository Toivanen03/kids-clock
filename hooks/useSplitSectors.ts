import { Sector, Weekday } from "../types/types";
import { useSettings } from "./useSettings";

const useSplitSectors = ( selectedDay: Weekday ): [Sector[], Sector[]] => {
  const { sectors } = useSettings();
  const sectorsToShow = sectors.filter(s => s.activeDays.includes(selectedDay))

  const [amEvents, pmEvents]: [Sector[], Sector[]] = sectorsToShow.reduce<[Sector[], Sector[]]>(
    (a, s) => {
      if (s.start < 12) {
        if (s.end > 12) {
          a[0].push({ ...s, end: 12 });
          a[1].push({ ...s, start: 12 });
        } else {
          a[0].push(s);
        }
      } else {
        if (s.start > 12 && s.end < s.start) {
          a[0].push({ ...s, start: 0 });
          a[1].push({ ...s, end: 24 });
        } else a[1].push(s);
      }
      return a;
    },
    [[], []]
  );

  return [amEvents, pmEvents];
};

export default useSplitSectors;