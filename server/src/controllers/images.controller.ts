import { RequestHandler } from 'express';
import { ImagesService } from '@/services/images.service';
import { plainToInstance } from 'class-transformer';
import { ImagesDto } from '@/dto/images.dto';
import { formatErrors } from '@/helpers/formatErrors';

export class ImagesController {
  private service: ImagesService;

  constructor() {
    this.service = new ImagesService();
  }

  getAllImages: RequestHandler = async (req, res): Promise<void> => {
    const placeId = req.query.placeId as string;
    const reviews = await this.service.getAllImages(placeId);
    res.send(reviews);
  };

  getImages: RequestHandler = async (req, res): Promise<void> => {
    const images = await this.service.getImages(req.params.id);
    res.send(images);
  };

  createImages: RequestHandler = async (req, res): Promise<void> => {
    try {
      const imagesDto = plainToInstance(ImagesDto, req.body);
      if (req.file) imagesDto.imageName = req.file.filename;
      const images = await this.service.createImages(imagesDto);
      res.send(images);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  };

  deleteImages: RequestHandler = async (req, res): Promise<void> => {
    try {
      await this.service.deleteImages(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  updateImages: RequestHandler = async (req, res): Promise<void> => {
    try {
      const imagesDto = plainToInstance(ImagesDto, req.body);
      const updatedImages = await this.service.updateImages(req.params.id, imagesDto);
      res.send(updatedImages);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(formatErrors(e));
      } else {
        res.status(500).send(e);
      }
    }
  };
}
