import DayTemplate from './day-template';

export default interface TimezoneTemplate {
  day: DayTemplate;
  zone: string;
  row: number;
  id: number;
}
