class CacheData {
  value: string;
  ttl: number;
  expiredMillisec: number;

  constructor(value: string, ttl: number = 1000) {
    this.value = value;
    this.ttl = ttl;
    this.expiredMillisec = Date.now() + ttl;
  }

  setValue(value: string) {
    this.value = value;
  }

  refresh() {
    this.expiredMillisec = Date.now() + this.ttl;
  }
}

export class SimpleCache {
  stdTTL?: number;
  dataMap: Map<String, CacheData> = new Map();

  constructor(stdTTL?: number) {
    this.stdTTL = stdTTL;
  }

  private getCacheData(key: String): CacheData | undefined {
    return this.dataMap.get(key);
  }

  isDefinedAt(key: String): Boolean {
    const result = this.dataMap.get(key);
    return result !== undefined && result?.expiredMillisec >= Date.now();
  }

  get(key: String): String | undefined {
    if (this.isDefinedAt(key)) return this.getCacheData(key)?.value;
    return undefined;
  }

  set(key: String, value: string, ttl?: number) {
    const cacheTTL = ttl ? ttl : this.stdTTL;

    this.dataMap.set(key, new CacheData(value, cacheTTL));
  }

  remove(key: String) {
    this.dataMap.delete(key);
  }

  refreshTTL(key: String) {
    const cacheData = this.getCacheData(key);

    cacheData?.refresh();
  }
}
