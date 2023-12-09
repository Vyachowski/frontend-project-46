import isObject from 'lodash/isObject.js';

function formatValue(value) {
  let formattedValue;

  if (isObject(value)) {
    formattedValue = '[complex value]';
  } else if (typeof value === 'string') {
    formattedValue = `'${value}'`;
  } else {
    formattedValue = value;
  }

  return formattedValue;
}

function createDiffLine(property, type, originalValue, modifiedValue) {
  const lineEnding = {
    added: `was added with value ${formatValue(modifiedValue)}`,
    removed: 'was removed',
    updated: `was updated. From ${formatValue(originalValue)} to ${formatValue(modifiedValue)}`,
  };

  return `Property '${property}' ${lineEnding[type]}`;
}

function iterateNodes(nodes, path) {
  const lines = nodes.map((node) => {
    const { key, type, children } = node;
    const property = path ? `${path}.${key}` : key;
    let line;
    switch (type) {
      case 'nested':
        line = iterateNodes(children, property);
        break;
      case 'unchanged':
        line = undefined;
        break;
      default:
        line = createDiffLine(property, type, node.originalValue, node.modifiedValue);
    }
    return line;
  });

  return `${lines.filter((value) => value !== undefined).join('\n')}`;
}

export default function plainFormatter(tree) {
  return iterateNodes(tree);
}
