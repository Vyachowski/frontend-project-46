import stylishFormatter from './formats/stylishFormatter.js';
import plainFormatter from './formats/plainFormatter.js';

export default function formatDiff(difference, format) {
  switch (format) {
    case 'plain':
      // console.log('Plain was runned!', JSON.stringify(difference, null, 2));
      return console.log(plainFormatter(difference));
    default:
      return console.log(stylishFormatter(difference));
  }
}
