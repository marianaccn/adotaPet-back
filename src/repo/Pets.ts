import BaseRepo from './Base';
import PetsModel from '../models/Pets';
import { IListPetsParams } from '../interfaces/ListPetsParams';

interface ISearchPetsQuery {
  name?: {
    $regex: string;
  };
  gender?: string;
  birthDate?: {
    $gte?: string;
    $lt?: string;
  };
  castrated?: boolean;
  vaccinated?: boolean;
  fiv?: boolean;
  felv?: boolean;
  status?: string;
}

class PetsRepo extends BaseRepo {
  async List({
    page,
    perPage,
    name,
    gender,
    birthRange,
    castrated,
    vaccinated,
    fiv,
    felv,
    status,
  }: IListPetsParams) {
    try {
      const query: ISearchPetsQuery = {};
      if (name) query.name = { $regex: '.*' + name + '.*' };
      if (gender) query.gender = gender;
      if (birthRange?.min)
        query.birthDate = {
          $lt: birthRange.min,
          $gte: birthRange.max,
        };
      if (castrated) query.castrated = castrated;
      if (vaccinated) query.vaccinated = vaccinated;
      if (fiv) query.fiv = fiv;
      if (felv) query.felv = felv;
      if (status) query.status = status;

      const data = await PetsModel.find(query)
        .limit(perPage)
        .skip(perPage * page)
        .sort({
          createdDate: 'asc',
        });
      return { data };
    } catch (error) {
      return { error };
    }
  }
}

export default new PetsRepo(PetsModel);
