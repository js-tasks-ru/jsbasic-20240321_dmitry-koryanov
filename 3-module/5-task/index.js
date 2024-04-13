function getMinMax(str) {

  let result = {
    min: 0,
    max: 0,
  };

  let array = str.split(' ');

  array.forEach(elem => {
    numberElement = Number(elem);
    if (Number.isFinite(numberElement) && numberElement < result.min) {
      result.min = numberElement;
    } else if (Number.isFinite(numberElement) && numberElement > result.max) {
      result.max = numberElement;
    }
  });

  return result;
}
