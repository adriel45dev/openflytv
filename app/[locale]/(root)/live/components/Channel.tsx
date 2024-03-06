import { ChannelType, TRANSMISSION_TYPE } from "@/app/[locale]/constants";
import { URLSearchParamsType } from "@/app/[locale]/shared/types";
import { useTranslations } from "next-intl";
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
  const selectedChannel = isNaN(Number(searchParams.channel))
    ? 0
    : Number(searchParams.channel);

  const t = useTranslations("Index");

  return (
    <Link
      href={`?${new URLSearchParams({
        ...searchParams,
        channel: String(channel.id),
      })}#player`}
      className={`group sm:h-32 min-h-full relative flex flex-col justify-center items-center gap-2 bg-gray-200 border p-4 rounded-lg hover:scale-105 hover:bg-slate-900 w-full border-b-4 hover:border-1 hover:border-green-400 ${
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
      <div className="group-hover:flex hidden justify-center items-center font-bold p-2 bg-opacity-80 text-white w-full h-full bg-slate-900 absolute text-sm flex-wrap break-words rounded-lg text-center">
        <span className="font-bold">{channel.channelName}</span>
      </div>
      <div
        className={`absolute gap-2 bottom-2 justify-center items-center bg-orange-500 bg-opacity-80 w-max rounded-full py-1 px-2 ${
          Number(selectedChannel) == channel.id ? "flex" : "hidden"
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        <div className="text-xs text-bold text-white sm:px-1">
          {t("live_label")}
        </div>
      </div>
    </Link>
  );
}
