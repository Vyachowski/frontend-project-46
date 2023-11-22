import isObject from 'lodash/isObject.js';

export default function plainFormatter(difference) {
  // eslint-disable-next-line consistent-return
  const iter = (currentValue, path = '') => {
    // eslint-disable-next-line no-prototype-builtins
    if (currentValue.hasOwnProperty('value') && !isObject(currentValue.value)) {
      const { changes, value, updatedValue } = currentValue;
      if (!(['not changed', undefined].includes(currentValue.changes))) {
        let stringEnd = '';
        if (changes === 'added') {
          stringEnd = ` with value: ${isObject(value) ? '[complex value]' : value}`;
        }
        if (changes === 'updated') {
          stringEnd = `. From ${isObject(value) ? '[complex value]' : value} to ${isObject(updatedValue) ? '[complex value]' : updatedValue}`;
        }
        return `Property ${path.join('.')} was ${changes}${stringEnd}`;
      }
      return 'empty entity';
    }

    const entries = Object.entries(currentValue);
    // console.log('Current Value is\n', currentValue);
    const lines = entries.map(([key, diff]) => {
      const property = path ? `${path}.${key}` : key;

      switch (diff.changes) {
        case 'added':
          return isObject(diff.value) ? `Property '${property}' was added with value: ${diff.value}\n${iter(diff.value, key)}` : `Property '${property}' was added with value: ${diff.value}`;
        case 'removed':
          return isObject(diff.value) ? `Property '${property}' was removed\n${iter(diff.value, key)}` : `Property '${property}' was removed`;
        case 'updated':
          return isObject(diff.value) ? `Property '${property}' was updated. From ${diff.value} to ${diff.updatedValue}\n${iter(diff.value, key)}` : `Property '${property}' was updated. From ${diff.value} to ${diff.updatedValue}`;
        default:
          return isObject(diff.value) ? `${iter(diff.value, key)}` : 'empty entity';
      }
    });

    return [
      ...lines.flat(),
    ].join('\n');
  };

  return iter(difference);
}
