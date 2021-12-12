import TimezoneType from "~/types/timezone-type";
import DayType from "~/types/day-type";
import ServiceType from "./service.type";

export type BlockType = {
  id: string;
  day: DayType;
  timezone: TimezoneType;
  column: number;
  isTaken: boolean;
  service?: ServiceType;
};

export default BlockType;
