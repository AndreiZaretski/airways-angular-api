class Helpers {
  filterArray([min, max], array) {
  return array.filter((el)=> {return (el>=min && el<=max)})
  }

  getRandomNumberPassengers(min) {
    min = Math.ceil(min);
    return Math.abs(Math.floor(Math.random() * (200 - min + 1))) + min;
  }

  getRandomElementArray(array){ return Math.floor(Math.random() * array.length)}
  
}

module.exports = new Helpers();