import validate from '../services/validate';
import format from '../services/format';
import { Request, Response } from 'express';
import {
  IListPetsParams,
  IRequestListPetsParams,
} from '../interfaces/ListPetsParams';
import PetsRepo from '../repo/Pets';
import sharp from 'sharp';
import crypto from 'crypto';
import S3Service from '../services/s3';

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

class PetsController {
  public async ListPets(
    req: Request<{}, {}, {}, IRequestListPetsParams>,
    res: Response
  ): Promise<Response> {
    try {
      const listParams = req.query;
      const isLogged = !!req.user;
      const valid: any = await validate.ListParams(listParams);
      if (valid.error) throw valid.error.message;
      const formattedData: IListPetsParams = format.ListParams(
        listParams,
        isLogged
      );
      const response = await PetsRepo.List(formattedData);
      return res.status(200).send({ response });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public async AddPet(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;
      const newPet = req.body;
      const imageName = generateFileName();
      const fileBuffer = await sharp(file?.buffer)
        .resize({ height: 1080, width: 1080, fit: 'contain' })
        .toBuffer();
      await S3Service.uploadFile(fileBuffer, imageName, file?.mimetype || '');

      await PetsRepo.Create({
        ...newPet,
        images: [imageName],
      });

      return res.status(201).send(newPet);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public async UpdatePet(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;
      const newPet = req.body;
      let imageName = newPet.imageName;
      if (file) {
        const fileBuffer = await sharp(file?.buffer)
          .resize({ height: 1080, width: 1080, fit: 'contain' })
          .toBuffer();

        await S3Service.uploadFile(fileBuffer, imageName, file?.mimetype || '');
      }

      await PetsRepo.Update({
        ...newPet,
        images: [imageName],
      });

      return res.status(200).send(newPet);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  public async RemovePet(req: Request, res: Response): Promise<Response> {
    try {
      // const { _id } = req.body;
      const { _id } = req.query;
      if (typeof _id !== 'string') throw new Error('id invalido');
      const { data } = await PetsRepo.Read(_id);
      if (data) {
        await S3Service.deleteFile(data.images[0]);
        await PetsRepo.Delete(_id);
        return res.status(200).send({
          message: `registro de [${data.name}] com o id ${_id} deletado com sucesso`,
        });
      } else {
        return res
          .status(400)
          .send({ error: 'Nao foi encontrado registro com esse ID' });
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}

export default new PetsController();
