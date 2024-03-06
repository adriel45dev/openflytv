import HLSPlayer from "@/app/[locale]/components/HLSPlayer";
import IframePlayer from "@/app/[locale]/components/IframePlayer";
import YoutubePlayer from "@/app/[locale]/components/YoutubePlayer";
import { ChannelType, TRANSMISSION_TYPE } from "@/app/[locale]/constants";
import { MainLogo, PlayStreamIcon } from "@/app/[locale]/shared/icons";
import Link from "next/link";
import React from "react";

const PlayChannelOut = ({ transmissionSRC }: { transmissionSRC: string }) => {
  return (
    <div className="h-60 sm:min-h-screen w-full flex flex-col py-4 px-1 sm:px-16">
      <Link
        href={transmissionSRC}
        target="_blank"
        className="flex-1 bg-slate-950 rounded-lg justify-center items-center flex relative shadow-sm shadow-green-400 cursor-pointer"
      >
        <PlayStreamIcon className="w-20 h-20 text-green-400 animate-pulse hover:text-blue-400" />

        <button className="absolute bg-gray-900 bottom-0 w-full h-10 rounded-lg flex justify-between items-center px-4 ">
          <span className="text-gray-200 folt-bold text-xs flex justify-center items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" /> LIVE
          </span>
        </button>
      </Link>
    </div>
  );
};

const LoadingChannel = ({
  channelURL,
  channelConection,
}: {
  channelURL: string;
  channelConection: boolean;
}) => {
  return (
    <div className="p-6 flex w-full flex-1">
      <div
        className={`w-full min-h-full gap-2 px-2 py-8 sm:p-8  flex flex-col sm:flex-row justify-center items-center rounded-lg ${
          channelConection ? "bg-green-400" : "bg-red-400"
        }`}
      >
        <MainLogo className="w-36 h-36 sm:w-96 sm:h-96" />

        <div className="text-2xl sm:text-4xl max-w-full flex flex-col flex-wrap text-slate-700 justify-center items-center gap-2 text-center break-words ">
          {channelConection ? (
            <span className="text-center animate-pulse">
              Estamos estabelecendo uma conexão. Agurde ou vá para o site do
              canal.
            </span>
          ) : (
            <span className="text-center animate-pulse">
              Não foi possível estabelecer a conexão. Escolha outro canal ou
              assista ao vivo no site.
            </span>
          )}

          <Link
            className="text-black font-extrabold max-w-full text-lg sm:text-4xl"
            href={channelURL}
          >
            {channelURL.replace("https://www.", "").replace("https://", "")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PlayerDisplay({ channel }: { channel: ChannelType }) {
  /**
   * verificar no canal selecioando se ele é do tipo scraping
   * definir a variavel channelConection;
   */
  return (
    <div className="w-full sticky top-0 z-50 sm:relative sm:z-0" id="player">
      {channel.transmissionType == TRANSMISSION_TYPE.YOUTUBE && (
        <YoutubePlayer channelId={channel.transmissionSRC} />
      )}

      {channel.transmissionType == TRANSMISSION_TYPE.IFRAME && (
        <IframePlayer src={channel.transmissionSRC} />
      )}

      {channel.transmissionType == TRANSMISSION_TYPE.STREAM &&
        (channel.transmissionSRC ? (
          <HLSPlayer src={channel.transmissionSRC} />
        ) : (
          // <LoadingChannel
          //   channelURL={channel.channelURL}
          //   channelConection={channelConection}
          // />
          <></>
        ))}

      {channel.transmissionType == TRANSMISSION_TYPE.CHANNEL && (
        <PlayChannelOut transmissionSRC={channel.transmissionSRC} />
      )}
    </div>
  );
}
