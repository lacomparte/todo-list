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