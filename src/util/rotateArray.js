const rotateArray = (array, reverse = false) =>
  reverse ? array.unshift(array.pop()) : array.push(array.shift());

export default rotateArray;
