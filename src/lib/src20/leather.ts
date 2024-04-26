import { IcLeatherLogo } from "../../assets";
import { BaseWalletAdapter } from "./types";

export class LeatherWalletAdapter extends BaseWalletAdapter {
  appUrl = "https://leather.io/";
  name = "Leather Wallet";
  icon = IcLeatherLogo.default;

  get isSupported() {
    return typeof window.LeatherProvider !== "undefined";
  }

  async connect() {
    const response = await window.LeatherProvider!.request("getAddresses");
    if ("result" in response) {
      const result = response.result;
      const address = result.addresses.find(
        (address) => address.type === "p2wpkh"
      );
      console.log(address);
      this.dispatch("address", address!.address);
    }
  }

  async sendTransaction() {}
}
