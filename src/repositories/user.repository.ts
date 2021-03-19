import { User, UserAddModel, UserViewModel } from '../models/user';
import { Repository } from './repository';

export class UserRepository extends Repository {
  async register({ email, password }: UserAddModel): Promise<UserViewModel> {
    return this._getPlain(User.create({ email, password }));
  }

  async count({ email }: UserAddModel) {
    return User.count({
      where: { email },
    });
  }

  async findByEmailAndPassword({ email, password }: UserAddModel): Promise<UserViewModel | null> {
    return this._getPlain(User.findOne({ where: { email, password } }));
  }
}
