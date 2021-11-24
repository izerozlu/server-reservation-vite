import TimezoneTemplate from './timezone-template';
import DayTemplate from './day-template';

export default interface BlockTemplate {
  id: string;
  day: DayTemplate;
  timezone: TimezoneTemplate;
  column: number;
  isTaken: boolean;
  note?: string;
}
