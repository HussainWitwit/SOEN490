var formatYear = { month: 'long', day: 'numeric' };
var formatMonth = { day: 'numeric' };
var formatDate = {year: 'numeric', month: 'long', day: 'numeric'}
var formatTime = { hour: 'numeric', minute: '2-digit', hour12: true };
var dayOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const stringRecurrenceFormatting = (
  granularity: string,
  dateInput: Date,
  repeatDay: number
): string => {
  let date = new Date(dateInput);
  switch (granularity) {
    case 'Yearly':
      return `Every year on ${
        date.toLocaleTimeString('en-us', formatYear).split(',')[0]
      } at ${date.toLocaleTimeString('en-us', formatTime)}`;
    case 'Monthly':
      return `Every ${
        date.toLocaleTimeString('en-us', formatMonth).split(',')[0]
      }th of the month at ${date.toLocaleTimeString('en-us', formatTime)}`;
    case 'Weekly':
      return `Every ${dayOfWeek[repeatDay - 1]} at ${date.toLocaleTimeString(
        'en-us',
        formatTime
      )}`;
    default:
      return 'Invalid';
  }
};

export const dateFormat = (dateInput: Date): string => {
  let date = new Date(dateInput);
  return date.toLocaleDateString('en-us', formatDate)
};

export const timeFormat = (dateInput: Date): string => {
  let date = new Date(dateInput);
  return date.toLocaleTimeString('en-us', formatTime)
};
