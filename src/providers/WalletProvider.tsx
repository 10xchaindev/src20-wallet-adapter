import { createContext } from "preact";

import { BaseWalletAdapter } from "../lib/src20/types";
import useAutoConnect from "../composables/useConnect";

type WalletConnectContextParams = {
  address: string | null;
  adapters: BaseWalletAdapter[];
  adapter?: BaseWalletAdapter | null;
  disconnect: () => void;
  connect: (adapter: BaseWalletAdapter) => void;
};

export const WalletConnectContext = createContext<WalletConnectContextParams>({
  address: null,
  adapters: [],
  connect: () => void 0,
  disconnect: () => void 0,
});

type WalletConnectProviderProps = {
  adapters: BaseWalletAdapter[];
  autoConnect?: boolean;
} & React.PropsWithChildren;

export default function WalletConnectProvider({
  adapters,
  autoConnect,
  children,
}: WalletConnectProviderProps) {
  const { adapter, connect, disconnect, address } = useAutoConnect(
    adapters,
    autoConnect!
  );

  return (
    <WalletConnectContext.Provider
      value={{ adapters, adapter, connect, disconnect, address }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
}
