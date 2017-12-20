const fft = require('fft-js');

const THRESHOLD = 3;
const SAMPLING_RATE = 25031;

const parse = (data) => data.trim().split(' ').map((value) => Number(value) || 0);

const process = (data) => {
  const values = parse(data);
  const diffs = values.map((value) => value >= 40 ? value - 40 : 40 - value);
  const sum = diffs.reduce((prev, current) => prev + current);
  const average = sum/diffs.length;

  const normals = values.map((value) => value - 40);
  const phasors = fft.fft(normals);
  const frequencies = fft.util.fftFreq(phasors, SAMPLING_RATE);
  const magnitudes = fft.util.fftMag(phasors);
  const fftResults = frequencies.map((freq, index) => ({ frequency: freq, magnitude: magnitudes[index] })).reduce((prev, current) => current.magnitude > prev.magnitude ? current : prev);

  return {
    result: average >= THRESHOLD,
    value: Object.assign({ average }, fftResults)
  };
}

module.exports = {
  process
};
