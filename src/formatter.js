import isObject from 'lodash/isObject.js';

function stringify(value, replacer = ' ', spacesCount = 4) {
  const iter = (currentValue, depth) => {
    if (!isObject(currentValue)) {
      if (currentValue === 'added') {
        return null; // uncompleted part!!!
      }
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    // const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, diff]) => {
        const leftShift = diff === 'not changed' ? 0 : 2;
        let prefix = '';
        if (diff === 'deleted') {
          prefix = '- ';
        }
        if (diff === 'added') {
          prefix = '+ ';
        }
        if (diff === 'modified') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}- ${key}: ${iter(diff, depth + 1)}
          ${replacer.repeat(depth * spacesCount - leftShift)}+ ${key}: ${iter(diff, depth + 1)}`;
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

export default function formatDiff(originalObj, modifiedObj, difference, format) {
  switch (format) {
    case 'kurwa':
      return 'Oranges are $0.59 a pound.';
    default:
      return stringify(difference);
  }
}
