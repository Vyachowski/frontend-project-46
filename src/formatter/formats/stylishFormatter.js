import isObject from 'lodash/isObject.js';

// export default function stylishFormatter(value, replacer = ' ', spacesCount = 4) {
//   const iter = (currentValue, depth) => {
//     if (!isObject(currentValue)) {
//       return `${currentValue}`;
//     }
//
//     const indentSize = depth * spacesCount;
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);
//     const entries = Object.entries(currentValue);
//     const lines = entries
//       .map(([key, diff]) => {
//         const leftShift = diff.changes === 'not changed' || diff.changes === undefined ? 0 : 2;
//
//         if (diff.changes === 'not changed') {
//           return `${replacer.repeat(depth * spacesCount - leftShift)}${key}: ${iter(diff.value, depth + 1)}`;
//         }
//         if (diff.changes === 'removed') {
//           return `${replacer.repeat(depth * spacesCount - leftShift)}- ${key}: ${iter(diff.value, depth + 1)}`;
//         }
//         if (diff.changes === 'added') {
//           return `${replacer.repeat(depth * spacesCount - leftShift)}+ ${key}: ${iter(diff.value, depth + 1)}`;
//         }
//         if (diff.changes === 'updated') {
//           return `${replacer.repeat(depth * spacesCount - leftShift)}- ${key}: ${iter(diff.value, depth + 1)}
// ${replacer.repeat(depth * spacesCount - leftShift)}+ ${key}: ${iter(diff.updatedValue, depth + 1)}`;
//         }
//         return `${replacer.repeat(depth * spacesCount - leftShift)}${key}: ${iter(diff, depth + 1)}`;
//       });
//
//     return [
//       '{',
//       ...lines,
//       `${bracketIndent}}`,
//     ].join('\n');
//   };
//
//   return iter(value, 1);
// }
function stringify(value, depth) {
  if (!isObject(value)) {
    return `${value}`;
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
  const lines = difference.map((node) => {
    let line;
    const { key, type, children } = node;
    if (type === 'nested') {
      line = `${indentation}${key}: ${stylishFormatter(children, depth + 1)}`;
    } else if (type === 'added') {
      line = `${shortIndentation}+ ${key}: ${stringify(node.modifiedValue)}`;
    } else if (type === 'removed') {
      line = `${shortIndentation}- ${key}: ${node.originalValue}`;
    } else if (type === 'updated') {
      line = `${shortIndentation}+ ${key}: ${node.modifiedValue}\n${shortIndentation}- ${key}: ${node.originalValue}`;
    } else if (type === 'unchanged') {
      line = `${indentation}${key}: ${node.originalValue}`;
    } else {
      console.log('Wua!');
      const [nodeKey, value] = Object.entries(node);
      line = `${indentation}${nodeKey}: ${value}`;
    }
    return line;
  });
  return `{\n${lines.join('\n')}\n${bracketIndentation}}`;
}
