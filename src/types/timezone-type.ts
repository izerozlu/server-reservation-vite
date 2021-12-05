import DayType from "~/types/day-type";
import BlockType from "./block-type";

type TimezoneType = {
  day: DayType;
  zone: string;
  row: number;
  id: number;
  blocks?: BlockType[]
};

export default TimezoneType;
