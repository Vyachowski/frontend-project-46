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

  const iter = (currentValue, path = '') => {
    // eslint-disable-next-line no-prototype-builtins
    if (currentValue.hasOwnProperty('value') && !isObject(currentValue.value)) {
      const { changes, value, updatedValue } = currentValue;
      if (!(['not changed'].includes(currentValue.changes))) {
        const stringEnd = defineStringEnd(changes, value, updatedValue);
        return `Property ${path} was ${changes}${stringEnd}`;
      }
      return 'empty entity';
    }

    const entries = Object.entries(currentValue);
    const lines = entries.map(([key, diff]) => {
      const property = path ? `${path}.${key}` : key;

      switch (diff.changes) {
        case 'added':
          return isObject(diff.value) ? `Property '${property}' was added with value: ${formatValue(diff.value)}${iter(diff.value, key)}` : `Property '${property}' was added with value: ${formatValue(diff.value)}`;
        case 'removed':
          return isObject(diff.value) ? `Property '${property}' was removed${iter(diff.value, key)}` : `Property '${property}' was removed`;
        case 'updated':
          return isObject(diff.value) ? `Property '${property}' was updated. From ${formatValue(diff.value)} to ${formatValue(diff.updatedValue)}${iter(diff.value, key)}` : `Property '${property}' was updated. From ${formatValue(diff.value)} to ${formatValue(diff.updatedValue)}`;
        default:
          return isObject(diff) ? `${iter(diff, property)}` : 'empty entity';
      }
    });

    return [
      ...lines.flat().filter((value) => value !== 'empty entity'),
    ].join('\n');
  };

  return iter(difference);
}
