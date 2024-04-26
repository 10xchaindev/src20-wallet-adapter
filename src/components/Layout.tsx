import { LeatherWalletAdapter } from "../lib/src20/leather";
import { UnisatWalletAdapter } from "../lib/src20/unisat";
import WalletConnectProvider from "../providers/WalletProvider";

export default function Layout({ children }: preact.PropsWithChildren) {
  return (
    <main className="font-sans">
      <WalletConnectProvider
        autoConnect
        adapters={[new UnisatWalletAdapter(), new LeatherWalletAdapter()]}
      >
        {children}
      </WalletConnectProvider>
    </main>
  );
}
