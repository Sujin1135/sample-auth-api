import Publisher from './publisher';

class Subscriber<K, T> {
  publisher: Publisher<K, T>;

  constructor(publisher: Publisher<K, T>) {
    this.publisher = publisher;
  }

  subscribe(evnetKey: K, handle: T) {
    this.publisher.handleMap.set(evnetKey, handle);
  }
}

export default Subscriber;