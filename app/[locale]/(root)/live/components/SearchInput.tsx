"use client";

import { URLSearchParamsType } from "@/app/[locale]/shared/types";
import Link from "next/link";
import React, { useState } from "react";

type SearchInputProps = {
  searchParams: URLSearchParamsType;
  t_search: string;
  t_search_channels: string;
};

export default function SearchInput({
  searchParams,
  t_search,
  t_search_channels,
}: SearchInputProps) {
  const s = searchParams.s ? String(searchParams.s) : "";

  const [searchInput, setSearchInput] = useState(s);

  return (
    <form className="w-full" id="search" role="search">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only text-white"
      >
        {t_search}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          className="block w-full p-2 ps-10 text-sm  border  rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={t_search_channels}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Link
          shallow={true}
          href={`?${new URLSearchParams({
            ...searchParams,
            s: searchInput,
          })}#filter-menu`}
          className="text-white absolute end-2.5 bottom-2 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-0.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          {t_search}
        </Link>
      </div>
    </form>
  );
}
