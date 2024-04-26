import { IcLeatherLogo, IcUnisatLogo } from "../assets";

type Provider = {
  name: string;
  icon: typeof import("*.svg");
};

export const providers: Provider[] = [
  {
    name: "Unisat Wallet",
    icon: IcUnisatLogo,
  },
  {
    name: "Leather Wallet",
    icon: IcLeatherLogo,
  },
];
