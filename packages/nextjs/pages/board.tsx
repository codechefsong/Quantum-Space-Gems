import Image from "next/image";
import { Cell } from "../components/board/Cell";
import type { NextPage } from "next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAccount, useWalletClient } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { DeployTroopCell } from "~~/components/board/DeployTroopCell";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

const Board: NextPage = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { data: spaceETHContract } = useScaffoldContract({
    contractName: "SpaceETH",
    walletClient,
  });

  const { data: gridData } = useScaffoldContractRead({
    contractName: "SpaceETH",
    functionName: "getGrid",
  });

  const { data: mynfts } = useScaffoldContractRead({
    contractName: "TroopNFT",
    functionName: "getMyNFTs",
    args: [address],
  });

  const { data: deploynfts } = useScaffoldContractRead({
    contractName: "TroopNFT",
    functionName: "getNonDeployTroops",
    args: [address],
  });

  const { data: tokenAmount } = useScaffoldContractRead({
    contractName: "GemToken",
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col items-center">
        <DndProvider backend={HTML5Backend}>
          <div className="grid lg:grid-cols-2 flex-grow gap-[30px]">
            <div>
              <h2 className="mt-4 text-3xl">Planet Ox</h2>
              <div className="flex flex-wrap" style={{ width: "400px" }}>
                {gridData &&
                  gridData.map((item, index) => (
                    <Cell
                      key={item.id.toString()}
                      id={item.id.toString()}
                      content={item.content.toString()}
                      nftId={item?.nftId?.toString()}
                      type={item.typeGrid}
                      index={index}
                      data={null}
                      spaceETHContract={spaceETHContract}
                      up={item.up.toString()}
                      down={item.down.toString()}
                      left={item.left.toString()}
                      right={item.right.toString()}
                      gridData={gridData}
                    />
                  ))}
              </div>
              <h2 className="mt-4 text-3xl">Deploy</h2>
              <div className="flex mt-[10px]">
                {deploynfts?.map((n, index) => (
                  <DeployTroopCell
                    key={index}
                    id="99"
                    content="T"
                    nftId={n?.nftId?.toString()}
                    type=""
                    index={99 + index}
                    data={n}
                    spaceETHContract={spaceETHContract}
                    up="0"
                    down="0"
                    left="0"
                    right="0"
                    gridData={gridData}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mt-4 text-3xl">Your Troops</h2>
              <div className="flex flex-col">
                {mynfts?.map((n, index) => (
                  <div key={index} className="flex border border-gray-30 font-bold bg-white mb-2">
                    <div className="bg-gray-500">
                      <Image className="mt-3" alt="Troop" width={70} height={70} src={n.url} />
                    </div>
                    <div className="p-2">
                      <p className="m-0">ID: {n?.id?.toString()}</p>
                      <p className="m-0">Heath Points: {n?.hp?.toString()}</p>
                      <p className="m-0">Oxygen Amount: {n?.oxygenAmount?.toString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-2xl">{tokenAmount?.toString()} Gems</p>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default Board;
