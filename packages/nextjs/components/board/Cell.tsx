import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

type CellInfo = {
  id: string;
  content: string;
  type: number;
  index: number;
  gridData: any;
  setGridData: any;
};

export const Cell = ({ id, content, type, index, gridData, setGridData }: CellInfo) => {
  const handleDrop = async (item: any, index: number) => {
    const newGrid = [...gridData];
    const oldContent = gridData[index].content;
    newGrid[index].content = item.content;
    newGrid[item.index].content = oldContent;
    setGridData(newGrid);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CELL",
    item: { id, index, type, content },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "CELL",
    drop: item => handleDrop(item, index),
  }));

  const cellRef = useRef(null);

  drag(drop(cellRef));
  return (
    <div
      ref={cellRef}
      className="w-16 h-16 border border-gray-300 flex items-center justify-center font-bold"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {content}
    </div>
  );
};
