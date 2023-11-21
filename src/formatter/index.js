import stylishFormatter from './formats/stylishFormatter.js';

export default function formatDiff(difference, format) {
  switch (format) {
    case 'kurwa':
      return 'Oranges are $0.59 a pound.';
    default:
      return console.log(stylishFormatter(difference));
  }
}
