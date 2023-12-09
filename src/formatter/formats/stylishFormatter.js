import isObject from 'lodash/isObject.js';

function stringify(value, depth) {
  if (!isObject(value)) {
    return value;
  }
  const indentation = '    '.repeat(depth);
  const bracketIndentation = '    '.repeat(depth - 1);
  const lines = Object.entries(value).map(([key, val]) => `${indentation}${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${bracketIndentation}}`].join('\n');
}

export default function stylishFormatter(difference, depth = 1) {
  const indentation = '    '.repeat(depth);
  const shortIndentation = indentation.slice(2);
  const bracketIndentation = '    '.repeat(depth - 1);
  const nextDepth = depth + 1;
  const lines = difference.map((node) => {
    let line;
    const { key, type, children } = node;
    if (type === 'nested') {
      line = `${indentation}${key}: ${stylishFormatter(children, nextDepth)}`;
    } else if (type === 'added') {
      line = `${shortIndentation}+ ${key}: ${stringify(node.modifiedValue, nextDepth)}`;
    } else if (type === 'removed') {
      line = `${shortIndentation}- ${key}: ${stringify(node.originalValue, nextDepth)}`;
    } else if (type === 'updated') {
      line = `${shortIndentation}- ${key}: ${stringify(node.originalValue, nextDepth)}\n${shortIndentation}+ ${key}: ${stringify(node.modifiedValue, nextDepth)}`;
    } else {
      line = `${indentation}${key}: ${node.originalValue}`;
    }
    return line;
  });
  return `{\n${lines.join('\n')}\n${bracketIndentation}}`;
}
