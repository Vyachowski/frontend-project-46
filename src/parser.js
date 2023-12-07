import YAML from 'yaml';

const parseFileToObject = (data, format) => {
  if (!(['.yml', '.yaml', '.json'].includes(format))) {
    throw new Error('Only yml/yaml/json formats are allowed. Please try again');
  }
  return (format === '.json' ? JSON.parse(data) : YAML.parse(data));
};

export default parseFileToObject;
