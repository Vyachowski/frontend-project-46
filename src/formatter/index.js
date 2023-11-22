import stylishFormatter from './formats/stylishFormatter.js';
import plainFormatter from './formats/plainFormatter.js';
import JSONFormatter from './formats/JSONFormatter.js';

export default function formatDiff(difference, format) {
  switch (format) {
    case 'json':
      return console.log(JSONFormatter(difference));
    case 'plain':
      return console.log(plainFormatter(difference));
    default:
      return console.log(stylishFormatter(difference));
  }
}
