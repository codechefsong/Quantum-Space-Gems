import { useState } from "react";
import { Cell } from "../components/board/Cell";
import type { NextPage } from "next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MetaHeader } from "~~/components/MetaHeader";

const generateGridData = () => {
  const data = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      data.push({
        id: `cell-${row}-${col}`,
        index: data.length,
        content: data.length + 1,
        typeGrid: 0,
      });
    }
  }
  return data;
};

const Board: NextPage = () => {
  const [gridData, setGridData] = useState(generateGridData());

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
                      gridData={gridData}
                      setGridData={setGridData}
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
