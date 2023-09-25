import DATA from './data.js'

export const fetchData = (keyword) => {
  const result = DATA.filter(data => data.toLowerCase().includes(keyword.toLowerCase()))
  return new Promise(res => {
    setTimeout(() => {
      res(result)
    }, 1000)
  })
}

export const debounce = (func, delay = 500) => {
  let timeout;
  return function () {
    const args = arguments;
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}