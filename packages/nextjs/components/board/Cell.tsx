import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { notification } from "~~/utils/scaffold-eth";

type CellInfo = {
  id: string;
  content: string;
  type: string;
  index: number;
  spaceETHContract: any;
  up: string;
  down: string;
  left: string;
  right: string;
};

export const Cell = ({ id, content, type, index, spaceETHContract, up, down, left, right }: CellInfo) => {
  const canMove = (item: any) => {
    console.log(item, index, up, down, left, right);
    if (index === 99) return true;
    if (item.up === id || item.down === id || item.left === id || item.right === id) return true;
    return false;
  };

  const handleDrop = async (item: any, index: number) => {
    console.log(item, index);
    if (item.index === 99) {
      await spaceETHContract?.write.placeSpaceShip([BigInt(index)]);
      notification.success("It was success");
    } else {
      await spaceETHContract?.write.movePlayer([item.id, index]);
      notification.success("Moving Player");
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CELL",
    item: { id, index, type, content, up, down, left, right },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "CELL",
    drop: item => handleDrop(item, index),
    canDrop: item => canMove(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const cellRef = useRef(null);

  drag(drop(cellRef));
  return (
    <div
      ref={cellRef}
      className="w-16 h-16 border border-gray-300 flex items-center justify-center font-bold relative"
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: "white",
        cursor: "move",
      }}
    >
      {content}
      {isOver && canDrop && (
        <div
          className="overlay"
          role={type}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "blue",
          }}
        />
      )}
      {!isOver && canDrop && (
        <div
          className="overlay"
          role={type}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
      {isOver && !canDrop && (
        <div
          className="overlay"
          role={type}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "red",
          }}
        />
      )}
    </div>
  );
};
