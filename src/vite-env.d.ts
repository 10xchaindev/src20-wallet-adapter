/// <reference types="vite/client" />

import "@leather-wallet/types";

type UnisatNetwork = "livenet" | "testnet";
type UnisatEvent = "accountsChanged" | "networkChanged";

type Inscription = {
  total: number;
  list: {
    inscriptionId: string;
    address: string;
    inscriptionNumber: string;
    address: string;
    outputValue: string;
    content: string;
    contentLength: string;
    contentType: number;
    preview: number;
    timestamp: number;
    offset: number;
    genesisTransaction: string;
    location: string;
  }[];
};

type TxOption = { feeRate: number };
type PsbtOption = {
  autoFinalized: boolean;
  toSignInputs: {
    index: number;
    address: string;
    publicKey: string;
    sighashTypes: number[];
    disableTweakSigner: boolean;
  }[];
};

export declare global {
  export interface Window {
    unisat: {
      requestAccounts: () => Promise<string[]>;
      getAccounts: () => Promise<string[]>;
      getPublicKey: () => Promise<string>;
      getBalance: () => Promise<string>;

      getNetwork: () => Promise<string>;
      switchNetwork: (network: UnisatNetwork) => Promise<UnisatNetwork>;

      signMessage: (
        message: string,
        type: "ecdsa" | "bip322-simple" = "ecdsa"
      ) => Promise<string>;
      pushTx: (message: string) => Promise<string>;

      signPsbt: (psbtHex: string, options?: PsbtOption) => Promise<string>;
      signPsbts: (
        psbtHexs: string[],
        options?: PsbtOption[]
      ) => Promise<string[]>;
      pushPsbt: (psbtHex: string) => Promise<string>;
      sendBitcoin: (
        to: string,
        satoshos: number,
        options?: TxOption
      ) => Promise<string>;

      sendInscription: (
        address: string,
        inscriptionId: string,
        options?: TxOption
      ) => Promise<string>;
      inscribeTransfer: (ticker: string, amount: number) => Promise<void>;
      getInscriptions: (cursor: number, size: number) => Promise<Inscription>;

      on: (event: UnisatEvent, subscribeFn: any) => void;
    };
  }
}
