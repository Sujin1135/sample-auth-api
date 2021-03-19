import generateRandomStrByCount from '../../utils/generateRandomStr';
import LoginStatus from '../../enums/login.status';
import { UserService } from '../user.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserAddModel, UserViewModel } from '../../models/user';
import setTimeoutForJest from '../../utils/setTimeoutForJest';
import IncorrectPasswordError from '../../exceptions/incorrect.password.error';

const userService = new UserService();
const userRepository = new UserRepository();

const createUser = () => ({
  email: `${generateRandomStrByCount(7)}@zamface.co.kr`,
  password: 'iewanf23342fnewaigb1234',
}) as UserAddModel;

test('register', async () => {
  const user = createUser();
  const result = await userService.register(user);

  expect(result).not.toBeNull();
});

test('each finding login status test', async (done) => {
  const user = createUser();
  const notRegisteredStatus = await userService.findLoginStatus(user);

  await userService.register(user);

  const notCachedStatus = await userService.findLoginStatus(user);

  userService.setCache({ ...user } as UserViewModel);

  const cachedStatus = await userService.findLoginStatus(user);

  expect(notRegisteredStatus).toBe(LoginStatus.NOT_REGISTERED);
  expect(notCachedStatus).toBe(LoginStatus.NOT_CACHED);
  expect(cachedStatus).toBe(LoginStatus.CACHED);

  done();
});

test('cached user test', async (done) => {
  const user = createUser();

  userService.setCache(user);

  const cache = userService.getCache(user.email);

  expect(cache).not.toBeNull();

  done();
});

test('cache timeout test', async (done) => {
  const user = createUser();

  userService.setCache(user, 300);

  const pwd = userService.getCache(user.email);

  expect(pwd).toBe(user.password);

  const testCallback = () => {
    const cachePwd = userService.getCache(user.email);

    expect(cachePwd).not.toBe(user.password);
  };

  setTimeoutForJest(testCallback, done, 500);
});

test('db login test', async (done) => {
  const user = createUser();
  const incorrectUser = createUser();

  await userRepository.register(user);

  const loginUser = await userService.login(user);
  const loginIncorrectUser = await userService.login(incorrectUser);

  expect(loginUser).not.toBeNull();
  expect(loginIncorrectUser).not.toBeNull();

  done();
});

test('login at first test', async (done) => {
  const user = createUser();

  await userService.login(user);

  const findModel = await userService.findByEmailAndPassword(user);

  expect(findModel).not.toBeNull();

  done();
});

test('throw incorrect password error in caching', () => {
  const user = createUser();

  userService.setCache(user);

  const incorrectUser = { email: user.email, password: 'incorrect password' } as UserAddModel;

  const t = () => {
    userService.findCachedUser(incorrectUser);
  };

  expect(t).toThrow(IncorrectPasswordError);
});

test('throw incorrect password error in db direct', async (done) => {
  const user = createUser();

  await userService.register(user);

  const incorrectUser = { email: user.email, password: 'incorrect password' } as UserAddModel;

  const t = async () => {
    await userService.findByEmailAndPassword(incorrectUser);
  };

  await expect(t()).rejects.toThrow();

  done();
});
