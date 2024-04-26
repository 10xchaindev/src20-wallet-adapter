export type WalletEvent = "address" | "network-changed" | "accounts-changed";

export default class WalletEventEmitter {
  private listeners: Map<WalletEvent, Function[]>;

  constructor() {
    this.listeners = new Map();
  }

  on<T extends Function>(event: WalletEvent, subscribeFn: T) {
    const fns = this.listeners.get(event) ?? [];
    fns.push(subscribeFn);

    this.listeners.set(event, fns);

    return () => this.removeListener(event, subscribeFn);
  }

  removeListener<T extends Function>(event: WalletEvent, subscribeFn: T) {
    const fns = this.listeners.get(event);
    if (fns) {
      const _fns = fns.filter((fn) => subscribeFn !== fn);
      this.listeners.set(event, _fns);
    }
  }

  removeAll(event?: WalletEvent) {
    if (event) this.listeners.delete(event);
    else this.listeners = new Map();
  }

  async dispatch(event: WalletEvent, ...args: any[]) {
    const fns = this.listeners.get(event);
    if (fns) await Promise.all(fns.map(async (fn) => await fn(...args)));
  }
}
