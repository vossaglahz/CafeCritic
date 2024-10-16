import { PlaceRoute } from './routes/place.route';
import { ReviewRoute } from './routes/review.route';
import { UserRoute } from './routes/user.route';
import { ImagesRoute } from './routes/images.route';
import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors()],
  controllers: [new PlaceRoute(), new ReviewRoute(), new UserRoute(), new ImagesRoute()]
});

app.listen();
