import { Cell } from "../components/board/Cell";
import type { NextPage } from "next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Board: NextPage = () => {
  const { data: gridData } = useScaffoldContractRead({
    contractName: "SpaceETH",
    functionName: "getGrid",
  });

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col items-center">
        <DndProvider backend={HTML5Backend}>
          <div className="flex">
            <div>
              <h2 className="mt-4 text-3xl">Ground</h2>
              <div className="flex flex-wrap" style={{ width: "350px" }}>
                {gridData &&
                  gridData.map((item, index) => (
                    <Cell
                      key={item.id.toString()}
                      id={item.id.toString()}
                      content={item.content.toString()}
                      type={item.typeGrid}
                      index={index}
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
