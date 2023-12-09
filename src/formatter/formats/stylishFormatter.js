import isObject from 'lodash/isObject.js';

const spacer = ' '.repeat(4);

function getIndentation(depth, symbol = '') {
  const indentation = spacer.repeat(depth);
  return (symbol === '' ? indentation : `${indentation.slice(2)}${symbol} `);
}

function getBracketIndentation(depth) {
  return spacer.repeat(depth - 1);
}

function stringify(value, depth) {
  if (!isObject(value)) {
    return value;
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndentation(depth)}${key}: ${stringify(val, depth + 1)}`,
  );
  return ['{', ...lines, `${getBracketIndentation(depth)}}`].join('\n');
}

export default function stylishFormatter(difference, depth = 1) {
  const nextDepth = depth + 1;
  const lines = difference.map((node) => {
    const { key, type, children } = node;
    let line;
    switch (type) {
      case 'nested':
        line = `${getIndentation(depth)}${key}: ${stylishFormatter(children, nextDepth)}`;
        break;
      case 'added':
        line = `${getIndentation(depth, '+')}${key}: ${stringify(node.modifiedValue, nextDepth)}`;
        break;
      case 'removed':
        line = `${getIndentation(depth, '-')}${key}: ${stringify(node.originalValue, nextDepth)}`;
        break;
      case 'updated':
        line = `${getIndentation(depth, '-')}${key}: ${stringify(node.originalValue, nextDepth)}\n${getIndentation(depth, '+')}${key}: ${stringify(node.modifiedValue, nextDepth)}`;
        break;
      default:
        line = `${getIndentation(depth)}${key}: ${node.originalValue}`;
    }
    return line;
  });

  return `{\n${lines.join('\n')}\n${getBracketIndentation(depth)}}`;
}
