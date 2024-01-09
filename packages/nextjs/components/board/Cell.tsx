import { useRef, useState } from "react";
import Image from "next/image";
import CaptureMenu from "./CaptureMenu";
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
};

export const Cell = ({ id, content, nftId, type, index, spaceETHContract, data, up, down, left, right }: CellInfo) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    if (index === 1) setIsDropdownOpen(!isDropdownOpen);
  };

  const canMove = (item: any) => {
    //console.log(item, index, up, down, left, right);
    if (index >= 99) return true;
    if (item.up === id || item.down === id || item.left === id || item.right === id) return true;
    return false;
  };

  const handleDrop = async (item: any, index: number) => {
    console.log(item, index, item?.data?.id?.toString(), "placer");
    if (item.index >= 99) {
      await spaceETHContract?.write.placeSpaceShip([BigInt(index), item?.data?.id?.toString()]);
      notification.success("It was success");
    } else {
      await spaceETHContract?.write.movePlayer([item.id, BigInt(index), item.nftId]);
      notification.success("Moving Player");
    }
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
        background: index === 1 || index === 16 || index === 26 ? "green" : "gray",
        cursor: "move",
      }}
      onClick={handleToggleDropdown}
    >
      {content === "0" && <p className="absolute z-10 mt-10 text-xl">{nftId}</p>}
      {content !== "0" && index !== 1 && <p>{content}</p>}
      {content === "0" && <Image alt="Troop" width={500} height={350} src="/spacetroop.png" />}
      {(index === 1 || index === 16 || index === 26) && <Image alt="Mine" width={500} height={350} src="/mine.png" />}
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
      {index === 1 && <CaptureMenu index={index} isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />}
    </div>
  );
};
