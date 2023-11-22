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

const plainFormattedDifference = `
 Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
`;

export {
  filePlain1,
  filePlain2,
  fileNested2,
  fileNested1,
  difference,
  stylishFormattedDifference,
  plainFormattedDifference,
};
