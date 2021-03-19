import { UserAddModel, UserViewModel } from '../models/user';
import LoginStatus from '../enums/login.status';
import Publisher from './publisher';

class LoginPublisher implements Publisher<LoginStatus, (u: UserAddModel) => Boolean> {
  handleMap = new Map();

  publish(status: LoginStatus) {
    return this.handleMap.get(status);
  }

  executeEventHandle(status: LoginStatus, userAddModel: UserAddModel): UserViewModel {
    const eventHandle = this.publish(status);
    return eventHandle(userAddModel);
  }
}

export default LoginPublisher;
