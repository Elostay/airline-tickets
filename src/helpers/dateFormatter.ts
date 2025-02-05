import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { uk } from "date-fns/locale";

const dateFormatter = (isoDate: string): string => {
  const timeZone = "Europe/Kyiv";
  const zonedDate = toZonedTime(new Date(isoDate), timeZone);

  return format(zonedDate, "d MMMM yyyy, HH:mm", { locale: uk });
};
export default dateFormatter;
