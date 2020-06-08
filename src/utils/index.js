export const generateId = () =>
  Math.random()
    .toString(36)
    .substring(2) + new Date().getTime().toString(36);

export const getMaxVal = (arr) => 
  arr.length ? Math.max(...arr.map(item => item.id)) + 1 : 0;

export const getMinDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() +1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}T00:00`;
}

export const dateFormat = (date) => {
  const expiredDate = new Date(date);
  const dateTimeFormat = new Intl.DateTimeFormat('ko', { 
    year: 'numeric', 
    month: 'short', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return dateTimeFormat.formatToParts(expiredDate).reduce((prevVal, currVal, idx) => 
    idx === 0 ? currVal.value : prevVal + currVal.value
    , '');
}