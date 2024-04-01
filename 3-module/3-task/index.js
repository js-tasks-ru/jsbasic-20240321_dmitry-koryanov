function camelize(str) {
  let splittedArray = str.split('-');
  
  return splittedArray[0] +
    splittedArray
      .slice(1)
      .filter(elem => !!elem)
      .map(elem => elem[0].toUpperCase() + elem.slice(1))
      .reduce((result, current) => result + current, '');
}
