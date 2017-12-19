const THRESHOLD = 50;

const parse = (data) => data.trim().split(' ').map((value) => Number(value) || 0);

const process = (data) => {
  const values = parse(data);
  for(value in values) {
    if(value >= THRESHOLD) {
      return true;
    }
  }
  return false;
}

module.exports = {
  process
};
