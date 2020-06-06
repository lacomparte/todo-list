export const get = (key = 'todo') => 
  JSON.parse(localStorage.getItem(key) || '[]');
export const set = (key = 'todo', value) => 
  localStorage.setItem(key, JSON.stringify(value));