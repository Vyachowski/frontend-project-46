import parseFileToObject from '../src/parser.js';

test('parser: existing file – yml, yaml, json', () => {
  expect(parseFileToObject('__fixtures__/file1.yml')).toStrictEqual({
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  });
  expect(parseFileToObject('__fixtures__/file2.yml')).toStrictEqual({
    host: 'hexlet.io', timeout: 20, verbose: true,
  });
  expect(parseFileToObject('__fixtures__/file1.yaml')).toStrictEqual({
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  });
  expect(parseFileToObject('__fixtures__/file2.yaml')).toStrictEqual({
    host: 'hexlet.io', timeout: 20, verbose: true,
  });
  expect(parseFileToObject('__fixtures__/file1.json')).toStrictEqual({
    host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false,
  });
  expect(parseFileToObject('__fixtures__/file2.json')).toStrictEqual({
    host: 'hexlet.io', timeout: 20, verbose: true,
  });
});

test('parser: non-existing file – yml, yaml, json', () => {
  expect(() => {
    parseFileToObject('__fixtures__/file.yml');
  }).toThrow('ENOENT: no such file or directory');

  expect(() => {
    parseFileToObject('file2.json');
  }).toThrow('ENOENT: no such file or directory');
});
