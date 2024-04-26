import EventEmitter from "./wallet-event-emitter";

export abstract class BaseWalletAdapter extends EventEmitter {
  abstract name: string;
  abstract icon: string;
  abstract isSupported: boolean;

  async reconnect(){}
  async connect() {}
  async sendTransaction() {}
}
