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

function iterateNodes(nodes, depth = 1) {
  const lines = nodes.map((node) => {
    let line;

    switch (node.type) {
      case 'nested':
        line = `${getIndentation(depth)}${node.key}: ${iterateNodes(node.children, depth + 1)}`;
        break;
      case 'added':
        line = `${getIndentation(depth, '+')}${node.key}: ${stringify(node.modifiedValue, depth + 1)}`;
        break;
      case 'removed':
        line = `${getIndentation(depth, '-')}${node.key}: ${stringify(node.originalValue, depth + 1)}`;
        break;
      case 'updated':
        line = `${getIndentation(depth, '-')}${node.key}: ${stringify(node.originalValue, depth + 1)}\n${getIndentation(depth, '+')}${node.key}: ${stringify(node.modifiedValue, depth + 1)}`;
        break;
      default:
        line = `${getIndentation(depth)}${node.key}: ${node.originalValue}`;
    }
    return line;
  });

  return `{\n${lines.join('\n')}\n${getBracketIndentation(depth)}}`;
}

export default function stylishFormatter(tree) {
  return iterateNodes(tree);
}
