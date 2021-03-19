import { UserAddModel, UserViewModel } from '../models/user';
import { UserRepository } from '../repositories/user.repository';
import { SimpleCache } from '../instances/simple.cache';
import LoginStatus from '../enums/login.status';
import Subscriber from '../instances/subscriber';
import LoginPublisher from '../instances/login.publisher';
import IncorrectPasswordError from '../exceptions/incorrect.password.error';

const userRepository = new UserRepository();
const simpleCache = new SimpleCache();

const DEFAULT_CACHING_TIME_IN_MILLIS = 30000;

export class UserService {
  publisher = new LoginPublisher();
  subscriber = new Subscriber(this.publisher);

  constructor() {
    this.registerLoginEventHandles();
  }

  private registerLoginEventHandles() {
    this.subscriber.subscribe(LoginStatus.NOT_REGISTERED, this.register);
    this.subscriber.subscribe(LoginStatus.NOT_CACHED, this.findByEmailAndPassword);
    this.subscriber.subscribe(LoginStatus.CACHED, this.findCachedUser);
  }

  findCachedUser({ email, password }: UserAddModel): UserViewModel {
    const cachedPwd = simpleCache.get(email);

    if (password === cachedPwd) return { email, password } as UserViewModel;
    else throw new IncorrectPasswordError();
  }

  async register({ email, password }: UserAddModel) {
    return userRepository.register({ email, password });
  }

  async findByEmailAndPassword(userAddModel: UserAddModel): Promise<UserViewModel | null> {
    const findUser = await userRepository.findByEmailAndPassword(userAddModel);

    if (findUser !== undefined) return findUser;
    else throw new IncorrectPasswordError();
  }

  async login(userAddModel: UserAddModel): Promise<UserViewModel> {
    const status = await this.findLoginStatus(userAddModel);
    const user = await this.publisher.executeEventHandle(status, userAddModel);

    this.setCache(user);

    return user;
  }

  async findLoginStatus({ email }: UserAddModel): Promise<LoginStatus> {
    const isCached = simpleCache.isDefinedAt(email);

    if (isCached) return LoginStatus.CACHED;

    const isRegistered = (await userRepository.count({ email } as UserAddModel)) > 0;

    return isRegistered ? LoginStatus.NOT_CACHED : LoginStatus.NOT_REGISTERED;
  }

  setCache({ email, password }: UserAddModel, ttl: number = DEFAULT_CACHING_TIME_IN_MILLIS) {
    simpleCache.set(email, password, ttl);
  }

  getCache(email: String) {
    return simpleCache.get(email);
  }
}
