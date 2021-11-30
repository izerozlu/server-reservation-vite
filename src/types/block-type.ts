import TimezoneType from "./timezone-type";
import DayType from "./day-type";

export type BlockType = {
  id: string;
  day: DayType;
  timezone: TimezoneType;
  column: number;
  isTaken: boolean;
  note?: string;
};

export default BlockType;
