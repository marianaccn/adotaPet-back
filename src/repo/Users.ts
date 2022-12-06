import BaseRepo from './Base';
import UsersModel from '../models/Users';

class UserRepo extends BaseRepo {
  public async FindByEmail(email: string) {
    return await UsersModel.findOne({ email });
  }
}

export default new UserRepo(UsersModel);
