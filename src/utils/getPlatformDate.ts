import addDays from 'date-fns/addDays';

export const getPlatformDate = (date: Date) => addDays(date, 1);
