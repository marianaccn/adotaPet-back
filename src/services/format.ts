import {
  IListPetsParams,
  IRequestListPetsParams,
} from '../interfaces/ListPetsParams';

class Format {
  private convertToDate(todayDate: Date, age: string, range: string) {
    if (range.includes('year'))
      todayDate.setFullYear(todayDate.getFullYear() - parseInt(age));
    else if (range.includes('month'))
      todayDate.setMonth(todayDate.getMonth() - parseInt(age));
    else if (range.includes('week'))
      todayDate.setDate(todayDate.getDate() - parseInt(age) * 7);
    else todayDate.setFullYear(todayDate.getFullYear() - 99);
    return todayDate;
  }
  private ageToBirthDate(ageRange: string) {
    const [minAge, minRange, maxAge, maxRange] = ageRange.split(' ');
    const minDate = this.convertToDate(new Date(), minAge, minRange);
    const maxDate = this.convertToDate(new Date(), maxAge, maxRange);

    return { min: minDate.toISOString(), max: maxDate.toISOString() };
  }

  public ListParams(
    RequestListPetsParams: IRequestListPetsParams,
    hasStatus?: boolean
  ): IListPetsParams {
    const {
      page,
      perPage,
      name,
      gender,
      ageRange,
      castrated,
      vaccinated,
      fiv,
      felv,
      status,
    } = RequestListPetsParams;
    const ListPetsParams: IListPetsParams = {
      page: parseInt(page),
      perPage: parseInt(perPage),
    };
    if (name) ListPetsParams.name = name;
    if (gender) ListPetsParams.gender = gender;
    if (!(hasStatus && !status)) ListPetsParams.status = 'disponivel';
    if (hasStatus && status) ListPetsParams.status = status;
    if (castrated) ListPetsParams.castrated = castrated === 'true';
    if (vaccinated) ListPetsParams.vaccinated = vaccinated === 'true';
    if (fiv) ListPetsParams.fiv = fiv === 'true';
    if (felv) ListPetsParams.felv = felv === 'true';
    if (ageRange) ListPetsParams.birthRange = this.ageToBirthDate(ageRange);
    return ListPetsParams;
  }
}

export default new Format();
