export function formatDateToTime(d: Date) {
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}
