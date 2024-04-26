import { useContext } from "preact/hooks";
import { WalletConnectContext } from "../providers/WalletProvider";

export default function useWallet() {
  return useContext(WalletConnectContext);
}
