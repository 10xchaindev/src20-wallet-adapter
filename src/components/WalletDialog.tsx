import clsx from "clsx";
import useWallet from "../composables/useWallet";
import { MdCheckCircle } from "react-icons/md";

type WalletConnectDialogProps = {
  onClose: () => void;
};

export default function WalletConnectDialog({
  onClose,
}: WalletConnectDialogProps) {
  const { adapters, adapter: currentAdapter, connect } = useWallet();

  return (
    <div className="fixed inset-0 flex flex-col bg-black/50">
      <div className="m-auto w-sm flex flex-col space-y-8 bg-white border rounded-md">
        <header className="flex">
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-lg">Choose Wallet</h1>
          </div>
          <button
            className="text-purple-700 text-sm p-4"
            onClick={onClose}
          >
            Cancel
          </button>
        </header>
        <div className="flex flex-col space-y-4 p-4">
          {adapters.map((adapter, index) => {
            const isSelected = adapter.name === currentAdapter?.name;

            return (
              <div
                key={index}
                className={clsx(
                  "flex space-x-4 p-4 rounded-md cursor-pointer active:bg-black/30",
                  isSelected ? "bg-black/10" : "bg-black/10"
                )}
                onClick={() => {
                  connect(adapter);
                  onClose();
                }}
              >
                <img
                  src={adapter.icon}
                  width={24}
                  height={24}
                />
                <div className="flex-1">
                  <p>{adapter.name}</p>
                </div>
                <div className="text-xl text-purple-700">
                  {isSelected && <MdCheckCircle />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
