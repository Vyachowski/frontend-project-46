import isObject from 'lodash/isObject.js';

function stylishFormatter(value, replacer = ' ', spacesCount = 4) {
  const iter = (currentValue, depth) => {
    if (!isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const entries = Object.entries(currentValue);
    const lines = entries
      .map(([key, diff]) => {
        const leftShift = diff.changes === 'not changed' || diff.changes === undefined ? 0 : 2;
        let prefix = '';
        if (diff.changes === 'not changed') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}${prefix}${key}: ${iter(diff.value, depth + 1)}`;
        }
        if (diff.changes === 'deleted') {
          prefix = '- ';
          return `${replacer.repeat(depth * spacesCount - leftShift)}${prefix}${key}: ${iter(diff.value, depth + 1)}`;
        }
        if (diff.changes === 'added') {
          prefix = '+ ';
          return `${replacer.repeat(depth * spacesCount - leftShift)}${prefix}${key}: ${iter(diff.value, depth + 1)}`;
        }
        if (diff.changes === 'modified') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}- ${key}: ${iter(diff.value, depth + 1)}
${replacer.repeat(depth * spacesCount - leftShift)}+ ${key}: ${iter(diff.modifiedValue, depth + 1)}`;
        }
        return `${replacer.repeat(depth * spacesCount - leftShift)}${prefix}${key}: ${iter(diff, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
}

export default function formatDiff(difference, format) {
  switch (format) {
    case 'kurwa':
      return 'Oranges are $0.59 a pound.';
    default:
      return console.log(stylishFormatter(difference));
  }
}
