import { ChannelType } from "@/app/[locale]/constants";
import React from "react";
import Channel from "./Channel";
import { URLSearchParamsType } from "@/app/[locale]/shared/types";

type ChannelGradeDisplayProps = {
  channels: ChannelType[];
  searchParams: URLSearchParamsType;
};

export default function ChannelGridSection({
  channels,
  searchParams,
}: ChannelGradeDisplayProps) {
  return (
    <div
      className="w-full flex flex-col justify-center items-center"
      id="ChannelGradeDisplay"
    >
      <ul className="flex-col w-full gap-2 p-4 grid grid-cols-3 sm:grid-cols-5">
        {channels.map((c, i) => (
          <li key={i}>
            <Channel channel={c} searchParams={searchParams}></Channel>
          </li>
        ))}
      </ul>
    </div>
  );
}
