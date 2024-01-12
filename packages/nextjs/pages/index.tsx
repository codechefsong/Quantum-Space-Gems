import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Quantum Space Gems</span>
          </h1>
          <Image className="ml-8" alt="Game" width={500} height={350} src="/game.png" />
          <p className="text-center text-lg">Embark on a journey to planets and collect precious gems</p>
          <div className="flex justify-center mb-2">
            <Link
              href="/board"
              passHref
              className=" py-2 px-16 mb-1 mt-3 bg-green-500 rounded baseline hover:bg-green-400 disabled:opacity-50"
            >
              Play
            </Link>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="text-center">
            <h2 className="mt-3 text-4xl">Gameplay</h2>
          </div>
          <div className="flex justify-center">
            <ul className="list-disc" style={{ width: "600px" }}>
              <li>Player have to buy and mint Troop NFT to play</li>
              <li>Player can deploy the Troop on to the planet</li>
              <li>Each troop start with 50 oxygen points</li>
              <li>Moving troop costs 1 oxygen points</li>
              <li>You can capture the gem field and mine for Gem as ERC20 tokens</li>
            </ul>
          </div>
          <p className="text-3xl text-center">Requirements</p>
          <div className="flex justify-center">
            <ul className="list-disc" style={{ width: "600px" }}>
              <li>To play, you must mint a Troop NFT to play</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
