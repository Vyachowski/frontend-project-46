import jest from 'jest-mock';
import parseFileToObject from '../src/parser.js';
import compareObjects, { getChangeType } from '../src/comparator.js';
import formatDiff from '../src/formatter/index.js';
import stylishFormatter from '../src/formatter/formats/stylishFormatter.js';

// eslint-disable max-len
// Test data
const filePlain1 = {
  host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
};

const filePlain2 = {
  host: 'hexlet.io', timeout: 20, verbose: true,
};

const fileNested1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const fileNested2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const difference = {
  common: {
    follow: { changes: 'added', value: false }, setting1: { changes: 'not changed', value: 'Value 1' }, setting2: { changes: 'removed', value: 200 }, setting3: { changes: 'updated', updatedValue: null, value: true }, setting4: { changes: 'added', value: 'blah blah' }, setting5: { changes: 'added', value: { key5: 'value5' } }, setting6: { doge: { wow: { changes: 'updated', updatedValue: 'so much', value: '' } }, key: { changes: 'not changed', value: 'value' }, ops: { changes: 'added', value: 'vops' } },
  },
  group1: { baz: { changes: 'updated', updatedValue: 'bars', value: 'bas' }, foo: { changes: 'not changed', value: 'bar' }, nest: { changes: 'updated', updatedValue: 'str', value: { key: 'value' } } },
  group2: { changes: 'removed', value: { abc: 12345, deep: { id: 45 } } },
  group3: { changes: 'added', value: { deep: { id: { number: 45 } }, fee: 100500 } },
};

const stylishFormattedDifference = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

// Parser tests
test('Parser: existing file, plain – yml, yaml, json', () => {
  expect(parseFileToObject('__fixtures__/file1-plain.yml')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.yml')).toStrictEqual(filePlain2);
  expect(parseFileToObject('__fixtures__/file1-plain.yaml')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.yaml')).toStrictEqual(filePlain2);
  expect(parseFileToObject('__fixtures__/file1-plain.json')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.json')).toStrictEqual(filePlain2);
});

test('Parser: non-existing file, plain – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/nonexistence-plain.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('nonexistence-plain.json');
  }).toThrow('ENOENT: no such file or directory');
});

test('Parser: existing file, nested – yml, yaml, json', () => {
  expect(parseFileToObject('__fixtures__/file1.yml')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.yml')).toStrictEqual(fileNested2);
  expect(parseFileToObject('__fixtures__/file1.yaml')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.yaml')).toStrictEqual(fileNested2);
  expect(parseFileToObject('__fixtures__/file1.json')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.json')).toStrictEqual(fileNested2);
});

test('Parser: existing file, plain – yml, yaml, json, absolute paths', () => {
  const absolutePathToFolder1 = `${process.cwd()}/__fixtures__/file1-plain.`;
  const absolutePathToFolder2 = `${process.cwd()}/__fixtures__/file2-plain.`;
  expect(parseFileToObject(`${absolutePathToFolder1}yml`)).toStrictEqual(filePlain1);
  expect(parseFileToObject(`${absolutePathToFolder2}yml`)).toStrictEqual(filePlain2);
  expect(parseFileToObject(`${absolutePathToFolder1}yaml`)).toStrictEqual(filePlain1);
  expect(parseFileToObject(`${absolutePathToFolder2}yaml`)).toStrictEqual(filePlain2);
  expect(parseFileToObject(`${absolutePathToFolder1}json`)).toStrictEqual(filePlain1);
  expect(parseFileToObject(`${absolutePathToFolder2}json`)).toStrictEqual(filePlain2);
});

test('Parser: non-existing file, nested – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/nonexistence.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('nonexistence.json');
  }).toThrow('ENOENT: no such file or directory');
});

test('Parser: existing file, non-json/yaml format', () => {
  expect(() => {
    parseFileToObject('__fixtures__/sample.png');
  }).toThrow('Only yml/yaml/json formats are allowed. Please try again');
});

// Comparator tests
test('Comparator: Get status of key', () => {
  expect(getChangeType('value', 'value')).toStrictEqual('not changed');
  expect(getChangeType('value', 'value2')).toStrictEqual('updated');
  expect(getChangeType('value2', 'value')).toStrictEqual('updated');
  expect(getChangeType(undefined, 'value')).toStrictEqual('added');
  expect(getChangeType('undefined', undefined)).toStrictEqual('removed');
});

test('Comparator: Get difference of files', () => {
  expect(compareObjects(fileNested1, fileNested2)).toStrictEqual(difference);
});

// Formatter tests
test('Formatter: Stylish format separate', () => {
  expect(stylishFormatter(difference)).toStrictEqual(stylishFormattedDifference);
});

test('Formatter: Formatter with stylish format', () => {
  // eslint-disable-next-line
  console.log = jest.fn();
  console.log(formatDiff(difference, 'stylish'));
  expect(console.log).toHaveBeenCalledWith(stylishFormattedDifference);
});
