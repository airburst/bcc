import dayjs from 'dayjs';

export const getNextWeek = () => {
  const nextWeek = dayjs()
    .add(7, 'day')
    .set('hour', 23)
    .set('minute', 59)
    .set('second', 59)
    .format('YYYY-MM-DD HH:mm:ss');

  return nextWeek;
};

export const formatDate = (date: string) => dayjs(date).format('dddd DD MMMM');
