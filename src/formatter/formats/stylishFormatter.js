import isObject from 'lodash/isObject.js';

export default function stylishFormatter(value, replacer = ' ', spacesCount = 4) {
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

        if (diff.changes === 'not changed') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}${key}: ${iter(diff.value, depth + 1)}`;
        }
        if (diff.changes === 'removed') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}- ${key}: ${iter(diff.value, depth + 1)}`;
        }
        if (diff.changes === 'added') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}+ ${key}: ${iter(diff.value, depth + 1)}`;
        }
        if (diff.changes === 'updated') {
          return `${replacer.repeat(depth * spacesCount - leftShift)}- ${key}: ${iter(diff.value, depth + 1)}
${replacer.repeat(depth * spacesCount - leftShift)}+ ${key}: ${iter(diff.updatedValue, depth + 1)}`;
        }
        return `${replacer.repeat(depth * spacesCount - leftShift)}${key}: ${iter(diff, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
}
