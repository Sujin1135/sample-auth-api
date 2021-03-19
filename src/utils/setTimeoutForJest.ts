const setTimeoutForJest = async (callback: (...args: any[]) => void, done: jest.DoneCallback, ms?: number) => {
  setTimeout(() => {
    callback();
    done();
  }, ms);
}

export default setTimeoutForJest;
