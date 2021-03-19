import { SimpleCache } from '../simple.cache';
import setTimeoutForJest from '../../utils/setTimeoutForJest';

const simpleCache = new SimpleCache(5000);

test('basic set / get', () => {
  const id = 'sattlub123@gmail.com';
  const pwd = 'test pwd';

  simpleCache.set(id, pwd);

  const result = simpleCache.get(id);

  expect(result).toBe(pwd);
});

test('expiration check', async (done) => {
  const id = 'chris@zamface.co.kr';
  const pwd = 'chris\'s password';
  const id2 = 'chris2@zamface.co.kr';
  const pwd2 = 'chris2\'s password';

  simpleCache.set(id, pwd, 200);
  simpleCache.set(id2, pwd2, 500);

  const testCallback = () => {
    const case1 = simpleCache.isDefinedAt(id);
    const case2 = simpleCache.isDefinedAt(id2);

    expect(case1).toBe(false);
    expect(case2).toBe(true);
  }

  setTimeoutForJest(testCallback, done, 300);
});

test('refresh check', async (done) => {
  const id = 'chris@zamface.co.kr';
  const pwd = 'chris\'s password';

  simpleCache.set(id, pwd, 500);

  const testCallback = () => {
    simpleCache.refreshTTL(id);

    const result = simpleCache.isDefinedAt(id);

    expect(result).toBe(true);
  }

  setTimeoutForJest(testCallback, done, 600);
});

test('remove check', () => {
  const id = 'chris@zamface.co.kr';
  const pwd = 'chris\'s password';

  simpleCache.set(id, pwd, 1000);

  const executeTest = (key: String, isExpected: Boolean) => {
    expect(simpleCache.isDefinedAt(key)).toBe(isExpected);
  }

  executeTest(id, true);

  simpleCache.remove(id);

  executeTest(id, false);
});
