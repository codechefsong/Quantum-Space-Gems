import { Cell } from "../components/board/Cell";
import type { NextPage } from "next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAccount, useWalletClient } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
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

  const { data: nfts } = useScaffoldContractRead({
    contractName: "TroopNFT",
    functionName: "getNonDeployTroops",
    args: [address],
  });

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col items-center">
        <DndProvider backend={HTML5Backend}>
          <div className="flex">
            <div>
              <h2 className="mt-4 text-3xl">Ground</h2>
              <div className="flex flex-wrap" style={{ width: "400px" }}>
                {gridData &&
                  gridData.map((item, index) => (
                    <Cell
                      key={item.id.toString()}
                      id={item.id.toString()}
                      content={item.content.toString()}
                      type={item.typeGrid}
                      index={index}
                      data={null}
                      spaceETHContract={spaceETHContract}
                      up={item.up.toString()}
                      down={item.down.toString()}
                      left={item.left.toString()}
                      right={item.right.toString()}
                    />
                  ))}
              </div>
              <div className="flex mt-[10px]">
                {nfts?.map((n, index) => (
                  <Cell
                    key={index}
                    id="99"
                    content="Your Ship"
                    type=""
                    index={99 + index}
                    data={n}
                    spaceETHContract={spaceETHContract}
                    up="0"
                    down="0"
                    left="0"
                    right="0"
                  />
                ))}
              </div>
            </div>
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default Board;
