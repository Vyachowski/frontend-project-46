import isObject from 'lodash/isObject.js';

export default function plainFormatter(difference) {
  const formatValue = (value) => {
    if (isObject(value)) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };

  const defineStringEnd = (changes, value, updatedValue) => {
    if (changes === 'added') {
      return ` with value: ${formatValue(value)}`;
    }
    if (changes === 'updated') {
      return `. From ${formatValue(value)} to ${formatValue(updatedValue)}`;
    }
    return '';
  };
  // eslint-disable-next-line consistent-return
  const iter = (currentValue, path = '') => {
    // eslint-disable-next-line no-prototype-builtins
    if (currentValue.hasOwnProperty('value') && !isObject(currentValue.value)) {
      // console.log(currentValue.hasOwnProperty('value'), isObject(currentValue.value));
      // console.log('Edge case called\n');
      const { changes, value, updatedValue } = currentValue;
      if (!(['not changed'].includes(currentValue.changes))) {
        const stringEnd = defineStringEnd(changes, value, updatedValue);
        return `Property ${path} was ${changes}${stringEnd}`;
      }
      return 'empty entity';
    }

    const entries = Object.entries(currentValue);
    // console.log('Not edge case called\n');
    const lines = entries.map(([key, diff]) => {
      const property = path ? `${path}.${key}` : key;

      switch (diff.changes) {
        case 'added':
          // console.log('Added called');
          return isObject(diff.value) ? `Property '${property}' was added with value: ${formatValue(diff.value)}${iter(diff.value, key)}` : `Property '${property}' was added with value: ${formatValue(diff.value)}`;
        case 'removed':
          // console.log('Removed called');
          return isObject(diff.value) ? `Property '${property}' was removed${iter(diff.value, key)}` : `Property '${property}' was removed`;
        case 'updated':
          // console.log('Updated called');
          return isObject(diff.value) ? `Property '${property}' was updated. From ${formatValue(diff.value)} to ${formatValue(diff.updatedValue)}${iter(diff.value, key)}` : `Property '${property}' was updated. From ${formatValue(diff.value)} to ${formatValue(diff.updatedValue)}`;
        default:
          // console.log('Default called');
          return isObject(diff) ? `${iter(diff, property)}` : 'empty entity';
      }
    });

    return [
      ...lines.flat().filter((value) => value !== 'empty entity'),
    ].join('\n');
  };

  return iter(difference);
}
