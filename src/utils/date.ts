import { format } from "date-fns";

export function formatDateToTime(d: Date) {
  return format(d, "HH:mm:ss.SSS")
}
