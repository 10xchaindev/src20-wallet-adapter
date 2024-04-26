import { Menu } from "@headlessui/react";
import { useState } from "preact/hooks";
import { IoCopyOutline, IoWalletOutline, IoUnlink } from "react-icons/io5";

import useWallet from "../composables/useWallet";
import WalletConnectDialog from "./WalletDialog";
import { formatAddress } from "../lib/web3/parse";

export default function WalletButton() {
  const { adapter, address, disconnect } = useWallet();
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  return (
    <>
      <Menu>
        <div className="relative flex flex-col p-4">
          <div
            className="self-start flex bg-black text-white rounded-lg
            cursor-pointer"
          >
            {adapter && address ? (
              <Menu.Button className="flex items-center justify-center space-x-2 px-4 py-3">
                <img
                  src={adapter.icon}
                  width={24}
                  height={24}
                />
                <span>{formatAddress(address)}</span>
              </Menu.Button>
            ) : (
              <span
                className="px-4 py-3"
                onClick={() => setShowWalletDialog(true)}
              >
                Connect Wallet
              </span>
            )}
          </div>
          <Menu.Items>
            <div className="absolute mt-1 bg-stone-200 text-sm w-46 flex flex-col divide-y divide-black/5 rounded-lg">
              <Menu.Item>
                <button className="flex items-center space-x-2 px-2 py-3">
                  <IoCopyOutline />
                  <span>Copy</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex items-center space-x-2 px-2 py-3"
                  onClick={() => setShowWalletDialog(true)}
                >
                  <IoWalletOutline />
                  <span>Change Wallet</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex items-center space-x-2 px-2 py-3"
                  onClick={disconnect}
                >
                  <IoUnlink />
                  <span>Disconnect</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </div>
      </Menu>
      {showWalletDialog && (
        <WalletConnectDialog onClose={() => setShowWalletDialog(false)} />
      )}
    </>
  );
}
