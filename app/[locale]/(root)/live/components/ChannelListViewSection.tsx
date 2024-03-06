"use client";
import { BackIcon, NextIcon } from "../../../shared/icons";
import React, { Children, useState } from "react";

type SectionViewProps = {
  children: React.ReactNode;
};

export default function ChannelListViewSection({ children }: SectionViewProps) {
  const [startIndex, setStarIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [index, setIndex] = useState(0);

  const itemCount = Children.count(children);
  const LIMIT_END_INDEX = Math.round(itemCount / 5 + 0.4) * 5;
  const LIMIT_START_INDEX = LIMIT_END_INDEX - 5;

  const handleNext = () => {
    setStarIndex((prev) => (prev + 5 > LIMIT_START_INDEX ? 0 : prev + 5));
    setEndIndex((prev) => (prev + 5 > LIMIT_END_INDEX ? 5 : prev + 5));
    setIndex((prev) => (prev + 1) % itemCount);
  };

  const handlePrevious = () => {
    setStarIndex((prev) => (prev - 5 < 0 ? LIMIT_START_INDEX : prev - 5));
    setEndIndex((prev) => (prev - 5 < 5 ? LIMIT_END_INDEX : prev - 5));
    setIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  return (
    <section className="my-6 flex h-full w-full select-none items-center justify-center gap-2 px-8">
      <BackIcon
        className="h-12 w-12 text-white hover:scale-125 hover:text-green-400"
        onClick={handlePrevious}
      />

      {/* CONTAINER CARD */}
      <div className="flex h-full w-full flex-col gap-4">
        {/* CARDS MOBILE */}
        <div className="grid w-full grid-cols-1 items-center justify-center gap-4 duration-700 ease-in-out md:hidden md:grid-cols-5">
          {Children.toArray(children)[index]}
        </div>
        {/* CARDS LG DEVICES */}
        <div className="hidden w-full grid-cols-1 items-center justify-center gap-4 h-full duration-700 ease-in-out md:grid md:grid-cols-5">
          {Children.toArray(children).slice(startIndex, endIndex)}
        </div>
      </div>

      <NextIcon
        className="h-12 w-12 text-white hover:scale-125 hover:rotate-180 hover:text-green-400"
        onClick={handleNext}
      />
    </section>
  );
}
