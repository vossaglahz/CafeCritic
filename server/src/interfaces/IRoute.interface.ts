import { Router } from 'express';

export interface IRoute {
  path: string; //интерфэйсует патч путь как стринг
  router: Router; //интерфэйсует роутер как Роутер от Эксперсс
}
