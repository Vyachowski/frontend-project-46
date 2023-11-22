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
    console.log('Current Value is\n', currentValue);
    const lines = entries.map(([key, diff]) => {
      const property = path ? `${path}.${key}` : key;
      const oldValue = iter(diff?.value);
      const updatedValue = iter(diff?.updatedValue);

      switch (diff.changes) {
        case 'added':
          return `Property '${property}' was added with value: ${oldValue}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${oldValue} to ${updatedValue}`;
        default:
          return 'empty entity';
      }
    });

    return [
      ...lines.flat(),
    ].join('\n');
  };

  return iter(difference);
}
