import isObject from 'lodash/isObject.js';

function formatValue(value) {
  if (isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function createDiffLine(property, type, originalValue, modifiedValue) {
  const lineEnding = {
    added: `was added with value: ${formatValue(modifiedValue)}`,
    removed: 'was removed',
    updated: `was updated. From ${formatValue(originalValue)} to ${formatValue(modifiedValue)}`,
  };

  return `Property '${property}' ${lineEnding[type]}`;
}

function iterateNodes(nodes, path) {
  const lines = nodes.map((node) => {
    const { key, type, children } = node;
    const property = path ? `${path}.${key}` : key;

    switch (type) {
      case 'nested':
        return iterateNodes(children, property);
      case 'unchanged':
        return null;
      default:
        return createDiffLine(property, type, node.originalValue, node.modifiedValue);
    }
  });

  return `${lines.filter((value) => value !== null).join('\n')}`;
}

export default function plainFormatter(tree) {
  return iterateNodes(tree);
}
