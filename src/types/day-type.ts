import TimezoneType from "./timezone-type";

type DayType = {
  id: string;
  name: string;
  weekday: number;
  date: Date;
  timezones?: TimezoneType[];
};

export default DayType;
