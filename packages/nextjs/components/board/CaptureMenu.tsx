import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type MenuInfo = {
  index: number;
  isOpen: any;
  onClose: any;
};

const CaptureMenu = ({ index, isOpen, onClose }: MenuInfo) => {
  const { address } = useAccount();
  const { data: gemFields } = useScaffoldContractRead({
    contractName: "SpaceETH",
    args: [BigInt(index)],
    functionName: "getGemFieldByID",
  });

  const { writeAsync: capture } = useScaffoldContractWrite({
    contractName: "SpaceETH",
    functionName: "capture",
    args: [BigInt(index)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: mineGem } = useScaffoldContractWrite({
    contractName: "SpaceETH",
    functionName: "mineGem",
    args: [BigInt(index)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="relative">
        {isOpen && (
          <div className="absolute z-10 -mt-7 ml-6 bg-white rounded shadow-md">
            <ul>
              {gemFields?.owner !== address && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => capture()}>
                  Capture
                </li>
              )}
              {gemFields?.owner === address && (
                <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => mineGem()}>
                  Mine
                </li>
              )}
              <li className="px-4 py-3 cursor-pointer hover:bg-gray-100" onClick={() => onClose()}>
                Cancel
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CaptureMenu;
