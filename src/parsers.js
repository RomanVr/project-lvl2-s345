import yaml from 'js-yaml';
import ini from 'ini';

const mappingToParse = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

const parse = (extenstionFile, data) => mappingToParse[extenstionFile](data);

export default parse;
