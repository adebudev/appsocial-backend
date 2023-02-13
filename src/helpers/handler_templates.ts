import path from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';

const TEMPLATES = {
  reset_password: 'src/static/reset_password.html'
}

export const handlerTemplates = (templateType, parameters = {}) => {
  const filePath = path.join(path.resolve(), TEMPLATES[templateType]);
  const source = readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  const htmlToSend = template(parameters);

  return htmlToSend;
};
