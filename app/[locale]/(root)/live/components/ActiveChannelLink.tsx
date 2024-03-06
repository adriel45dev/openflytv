import { ChannelType } from "@/app/[locale]/constants";
import Link from "next/link";
import React from "react";

export default function ActiveChannelLink({
  channel,
}: {
  channel: ChannelType;
}) {
  return (
    <div className="my-2 flex max-w-full justify-center items-center border border-slate-600  rounded-full px-6 gap-2 hover:bg-slate-700">
      <div>
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse "></div>
      </div>
      <Link
        target="_blank"
        className="text-white text-md max-w-full break-words text-center"
        href={channel.channelURL}
      >
        {channel.channelName}
      </Link>
    </div>
  );
}
