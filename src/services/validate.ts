import Joi from 'joi';
import { IRequestListPetsParams } from '../interfaces/ListPetsParams';

class Validate {
  public async ListParams(listParams: IRequestListPetsParams): Promise<any> {
    const schema = Joi.object({
      page: Joi.string().pattern(/[0-9]{1,3}/),
      perPage: Joi.string().pattern(/([1-9][0-9])|[1-9]/),
      ageRange: Joi.string()
        .pattern(/[0-9]{1,2} (month|week|year) [0-9]{1,2} (month|week|year)/)
        .allow(''),
      name: Joi.string().allow(''),
      gender: Joi.string().valid('m', 'f').allow(''),
      castrated: Joi.string().valid('true', 'false').allow(''),
      vaccinated: Joi.string().valid('true', 'false').allow(''),
      fiv: Joi.string().valid('true', 'false').allow(''),
      felv: Joi.string().valid('true', 'false').allow(''),
      status: Joi.string().valid('disponivel', 'adotado').allow(''),
    });

    return await schema.validate(listParams);
  }
}

export default new Validate();
