import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Marketplace: NextPage = () => {
  const { address } = useAccount();

  const [selectedNFT, setSelectNFT] = useState(-1);

  const { data: nfts } = useScaffoldContractRead({
    contractName: "TroopNFT",
    functionName: "getMyNFTs",
    args: [address],
  });

  const { writeAsync: mintNFT } = useScaffoldContractWrite({
    contractName: "TroopNFT",
    functionName: "mint",
    args: [address, "URL"],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex items-center flex-col flex-grow pt-7">
      <div className="px-5">
        <h1 className="text-center mb-5">
          <span className="block text-3xl mb-2">Your Troops</span>
        </h1>

        <div className="flex">
          {nfts?.map((n, index) => (
            <div
              key={index}
              className="w-16 h-20 border border-gray-30 font-bold mr-2 mb-2 cursor-pointer"
              style={{ background: selectedNFT === index ? "#00cc99" : "white" }}
              onClick={() => setSelectNFT(index)}
            >
              <Image alt="Troop" width={100} height={100} src={n.url} />
              <p className="m-0">Ox {n?.oxygenAmount?.toString()}</p>
            </div>
          ))}
        </div>

        <h1 className="text-center mb-5">
          <span className="block text-2xl mb-2">Buy Troop</span>
        </h1>

        <Image alt="Troop" width={100} height={100} src="/spacetroop.png" />

        <button
          className="py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={() => mintNFT()}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Marketplace;
