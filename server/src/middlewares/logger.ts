import { RequestHandler } from 'express';

const logger = (): RequestHandler => (req, res, next) => {
  console.log(`Request logged: ${req.method}, ${req.path}`);
  next();
};

export default logger;
 //логирует и показывает логи в консоли, на самом деле логеры должны сохраняться и иметь более объемную информацию, но это для того чтобы было
 //пока не обязательно делать его сложным, главное чтобы было