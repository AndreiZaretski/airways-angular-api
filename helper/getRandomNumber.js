module.exports =function getRandomIntInclusive(min) {
  min = Math.ceil(min);
  return Math.floor(Math.random() * (350 - min + 1)) + min;
}
