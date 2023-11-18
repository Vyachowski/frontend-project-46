import parseFileToObject from '../src/parser.js';

// Parser test
test('parser: existing file, plain – yml, yaml, json', () => {
  const filePlain1 = {
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  };

  const filePlain2 = {
    host: 'hexlet.io', timeout: 20, verbose: true,
  };

  expect(parseFileToObject('__fixtures__/file1-plain.yml')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.yml')).toStrictEqual(filePlain2);
  expect(parseFileToObject('__fixtures__/file1-plain.yaml')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.yaml')).toStrictEqual(filePlain2);
  expect(parseFileToObject('__fixtures__/file1-plain.json')).toStrictEqual(filePlain1);
  expect(parseFileToObject('__fixtures__/file2-plain.json')).toStrictEqual(filePlain2);
});

test('parser: non-existing file, plain – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/nonexistence-plain.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('nonexistence-plain.json');
  }).toThrow('ENOENT: no such file or directory');
});

test('parser: existing file, nested – yml, yaml, json', () => {
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

  expect(parseFileToObject('__fixtures__/file1.yml')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.yml')).toStrictEqual(fileNested2);
  expect(parseFileToObject('__fixtures__/file1.yaml')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.yaml')).toStrictEqual(fileNested2);
  expect(parseFileToObject('__fixtures__/file1.json')).toStrictEqual(fileNested1);
  expect(parseFileToObject('__fixtures__/file2.json')).toStrictEqual(fileNested2);
});

test('parser: non-existing file, nested – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/nonexistence.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('nonexistence.json');
  }).toThrow('ENOENT: no such file or directory');
});

// Comparator test
