import { useRef } from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { notification } from "~~/utils/scaffold-eth";

type CellInfo = {
  id: string;
  content: string;
  nftId: string;
  type: string;
  index: number;
  spaceETHContract: any;
  data: any;
  up: string;
  down: string;
  left: string;
  right: string;
  gridData: any;
};

export const DeployTroopCell = ({
  id,
  content,
  nftId,
  type,
  index,
  spaceETHContract,
  data,
  up,
  down,
  left,
  right,
  gridData,
}: CellInfo) => {
  const canMove = (item: any) => {
    console.log(item, index, up, down, left, right, gridData);
    // if (index >= 99) return true;
    // if (item.up === id || item.down === id || item.left === id || item.right === id) return true;
    // return false;
    return true;
  };

  const handleDrop = async (item: any, index: number, gridData: any) => {
    console.log(item, index, gridData);

    await spaceETHContract?.write.placeSpaceShip([BigInt(index), item?.data?.id?.toString()]);
    notification.success("It was success");
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CELL",
    item: { id, index, type, content, nftId, data, up, down, left, right },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "CELL",
    drop: item => handleDrop(item, index, gridData),
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
        background: "gray",
        cursor: "move",
      }}
    >
      <p className="absolute z-20 mt-10 text-xl">{nftId}</p>
      <Image className="z-10" alt="Troop" width={50} height={350} src="/spacetroop.png" />
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
