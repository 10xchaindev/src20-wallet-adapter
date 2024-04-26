import { useEffect, useState } from "preact/hooks";
import { BaseWalletAdapter } from "../lib/src20/types";
import { LOCAL_PREVIOUS_CONNECT_WALLET_KEY } from "../config";

export default function useConnect(
  adapters: BaseWalletAdapter[],
  autoConnect: boolean
) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [adapter, setAdapter] = useState<BaseWalletAdapter | null>(null);

  const setLocalWalletName = (name: string) =>
    window.localStorage.setItem(LOCAL_PREVIOUS_CONNECT_WALLET_KEY, name);

  const connect = (adapter: BaseWalletAdapter) => {
    adapter.connect();
    setLocalWalletName(adapter.name);
    setAdapter(adapter);
  };

  const disconnect = () => {
    setLocalWalletName("");
    setAdapter(null);
    setAddress(null);
  };

  useEffect(() => {
    if (autoConnect) {
      const localPreviousWalletName = window.localStorage.getItem(
        LOCAL_PREVIOUS_CONNECT_WALLET_KEY
      );

      if (localPreviousWalletName) {
        const adapter = adapters.find(
          ({ name }) => name === localPreviousWalletName
        )!;

        setAdapter(adapter);
      }
    }
  }, [autoConnect, adapters]);

  useEffect(() => {
    if (adapter) {
      adapter.on("address", setAddress);

      /// connect here, to prevent race condition
      adapter.connect().then(() => setIsConnecting(false));
      return () => adapter.removeAll();
    }
  }, [adapter]);

  return {
    address,
    setAddress,
    adapter,
    setAdapter,
    connect,
    disconnect,
    isConnecting,
  } as const;
}
