import React from "react";
import { LybraryIcon, OpenTVLogoIcon, PlayStreamIcon } from "../shared/icons";
import Link from "next/link";

const ButtonMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-700 py-2 px-6 rounded-full hover:bg-green-500 flex justify-center items-center gap-2">
      {children}
    </div>
  );
};

export default function Navbar() {
  return (
    <header className="w-full bg-slate-800 flex text-white px-6 py-4 shadow-lg shadow-salte-400">
      <nav className="flex justify-between items-center w-full">
        <Link
          href={"/"}
          className="flex justify-center items-center gap-1 hover:scale-105 group text-green-400 hover:text-white"
        >
          <OpenTVLogoIcon className="w-12 h-12" />
          <h1 className="font-extrabold text-lg hidden sm:inline-block ">
            OpenFlyTV
          </h1>
        </Link>

        <ul className="gap-2 hidden sm:flex">
          <li>
            <Link href={"/live"}>
              <ButtonMenu>
                <PlayStreamIcon className="w-6 h-6" />
                <div>Agora na TV</div>
              </ButtonMenu>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
