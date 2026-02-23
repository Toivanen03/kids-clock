import { Sector } from "../types/types";
import { useSettings } from "./useSettings";

const useSplitSectors = (): [Sector[], Sector[]] => {
  const { sectors } = useSettings();

  const [amEvents, pmEvents]: [Sector[], Sector[]] = sectors.reduce<[Sector[], Sector[]]>(
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