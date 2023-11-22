import stylishFormatter from './formats/stylishFormatter.js';
import plainFormatter from './formats/plainFormatter.js';
import JSONFormatter from './formats/JSONFormatter.js';

export default function formatDiff(difference, format) {
  switch (format) {
    case 'json':
      return JSONFormatter(difference);
    case 'plain':
      return plainFormatter(difference);
    default:
      return stylishFormatter(difference);
  }
}
