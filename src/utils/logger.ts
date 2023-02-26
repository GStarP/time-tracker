export function createLogger(namespace: string) {
  return {
    debug(...args: any[]) {
      console.debug(`[${namespace}]`, ...args);
    },
    log(...args: any[]) {
      console.log(`[${namespace}]`, ...args);
    },
    warn(...args: any[]) {
      console.warn(`[${namespace}]`, ...args);
    },
    error(...args: any[]) {
      console.error(`[${namespace}]`, ...args);
    },
  };
}
