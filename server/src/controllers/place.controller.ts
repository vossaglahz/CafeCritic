import { PlaceService } from '@/services/place.service';
import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { PlaceDto } from '@/dto/place.dto';
import { formatErrors } from '@/helpers/formatErrors';

export class PlaceController {
  private service: PlaceService;

  constructor() {
    this.service = new PlaceService();
  }

  getAllPlaces: RequestHandler = async (req, res): Promise<void> => {
    const places = await this.service.getAllPlaces();
    res.send(places);
  };

  getPlace: RequestHandler = async (req, res): Promise<void> => {
    const place = await this.service.getPlace(req.params.id);
    res.send(place);
  };

  createPlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      const placeDto = plainToInstance(PlaceDto, req.body);
      if (req.file) placeDto.mainImage = req.file.filename;
      const place = await this.service.createPlace(placeDto);
      res.send(place);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  };

  deletePlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deletePlace(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  updatePlace: RequestHandler = async (req, res): Promise<void> => {
    try {
      const placeDto = plainToInstance(PlaceDto, req.body);
      const updatedPlace = await this.service.updatePlace(req.params.id, placeDto);
      res.send(updatedPlace);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  };
}
