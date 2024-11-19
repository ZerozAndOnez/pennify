/**
 * A better option than these utils would be to use a library like luxon
 * However, for our purposes, these utils are sufficient
 */

export const convertMillisecondsToSeconds = (milliseconds: number): number => {
  return milliseconds / 1000;
};

export const addMinutes = (date: Date, minutes: number): Date => {
  // Avoid mutating date
  const newDate = new Date(date.getTime());
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
};
