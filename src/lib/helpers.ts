export function formatTripDates(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const monthDay = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    });

  if (start.getUTCFullYear() === end.getUTCFullYear()) {
    return `${monthDay(start)} - ${monthDay(end)} ${end.getUTCFullYear()}`;
  }

  return `${monthDay(start)} ${start.getUTCFullYear()} - ${monthDay(end)} ${end.getUTCFullYear()}`;
}
