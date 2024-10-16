import { RequestHandler } from 'express';
import { IRoute } from './IRoute.interface';

export interface AppInit {
  port: number; //интерфейсует порт как намбер
  middlewares: RequestHandler[]; //интерфэйсует миддлуэйр как РекуестХэндлер от эксперсс 
  controllers: IRoute[];  //интерфэйсует контроллерс как массив Роутов
}