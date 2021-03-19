interface Publisher<K, T> {
  handleMap: Map<K, T>;

  publish(k: K): T;
}

export default Publisher;