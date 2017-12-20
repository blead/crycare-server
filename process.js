const THRESHOLD = 7;

const parse = (data) => data.trim().split(' ').map((value) => Number(value) || 0);

const process = (data) => {
  const values = parse(data);
  const diffs = values.map((value) => value >= 40 ? value - 40 : 40 - value);
  const sum = diffs.reduce((prev, current) => prev + current);
  const average = sum/diffs.length;
  return {
    result: average >= THRESHOLD,
    value: average
  };
}

module.exports = {
  process
};
