import { ChannelType, TRANSMISSION_TYPE } from "@/app/[locale]/constants";
import { URLSearchParamsType } from "@/app/[locale]/shared/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Channel({
  channel,
  searchParams,
}: {
  channel: ChannelType;
  searchParams: URLSearchParamsType;
}) {
  //   const selectedZone = String(searchParams.zone);
  //   const selectedCountry = String(searchParams.country);
  //   const selectedLanguage = searchParams.lang;
  const selectedChannel = isNaN(Number(searchParams.channel))
    ? 0
    : Number(searchParams.channel);

  return (
    <Link
      // onClick={() => {
      //   const [channelS] = channels.filter((c) => c.id == channel.id);
      //   setSelectedChannel(channelS);
      // }}
      href={`?${new URLSearchParams({
        ...searchParams,
        channel: String(channel.id),
      })}#player`}
      className={`group h-32 relative flex flex-col justify-center items-center gap-2 bg-gray-200 border p-4 rounded-lg hover:bg-slate-900 w-full border-b-8 ${
        channel.transmissionType != TRANSMISSION_TYPE.CHANNEL &&
        channel.transmissionSRC
          ? "border-b-green-400"
          : "border-purple-600"
      } ${
        channel.transmissionType == TRANSMISSION_TYPE.STREAM &&
        !channel.transmissionSRC
          ? "border-orange-600"
          : ""
      }`}
    >
      <Image
        src={channel.channelLogo}
        alt={channel.channelName}
        width={80}
        height={80}
        className="w-24"
        loading="eager"
        priority={true}
      />
      <div className="group-hover:flex hidden justify-center items-center font-bold p-2 bg-opacity-80 text-white w-full h-full bg-slate-900 absolute text-sm flex-wrap break-words rounded-lg ">
        <span className="font-bold">{channel.channelName}</span>
      </div>
      <div
        className={`absolute gap-2 bottom-2 justify-center items-center bg-orange-600 bg-opacity-80 w-max rounded-full py-1 px-1 ${
          Number(selectedChannel) == channel.id ? "flex" : "hidden"
        }`}
      >
        {/* ${
            selectedChannel.id == channel.id ? "flex" : "hidden"
          } */}
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        <div className="text-xs text-bold text-white">AO VIVO</div>
      </div>
    </Link>
  );
}
