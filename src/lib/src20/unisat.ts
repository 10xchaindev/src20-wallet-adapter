import { IcUnisatLogo } from "../../assets";
import { BaseWalletAdapter } from "./types";

export class UnisatWalletAdapter extends BaseWalletAdapter {
  name = "Unisat";
  icon = IcUnisatLogo.default;

  private unisat: typeof window.unisat;

  constructor() {
    super();

    this.unisat = window.unisat;
  }

  get isSupported() {
    return typeof window.unisat === "undefined";
  }

  async connect() {
    const [address] = await this.unisat.requestAccounts();
    this.dispatch("address", address);
  }

  async reconnect() {
    await this.connect();
  }

  async sendTransaction() {}
}
