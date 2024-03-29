import React from "react";
import { OpenTVLogoIcon, PlayStreamIcon } from "../shared/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import SwitchLangauge from "./SwitchLangauge";

const ButtonMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-700 py-2 px-6 rounded-full hover:bg-green-500 flex justify-center items-center gap-2">
      {children}
    </div>
  );
};

export default function Navbar() {
  const t = useTranslations("Index");
  const l = useLocale();

  return (
    <header className="w-full sm:bg-slate-800 border-b-2 border-green-400  flex text-white px-6 py-2 sm:py-4  shadow-salte-400">
      <nav className="flex justify-between items-center w-full">
        <Link
          href={"/"}
          className=" flex justify-center items-center gap-1 hover:scale-105 group text-green-400 hover:text-white"
        >
          <OpenTVLogoIcon className="sm:w-12 sm:h-12 w-10 h-10" />
          <h1 className="font-extrabold text-lg hidden sm:inline-block">
            OpenFlyTV
          </h1>
        </Link>

        <ul className="gap-2 justify-center items-center flex">
          <li className="hidden sm:inline-block">
            <Link href={`${l}/live`}>
              <ButtonMenu>
                <PlayStreamIcon className="w-6 h-6" />
                <div>{t("live")}</div>
              </ButtonMenu>
            </Link>
          </li>
          <li>
            <SwitchLangauge lang={l} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
