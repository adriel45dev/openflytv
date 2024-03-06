"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SwitchLangauge({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLanguage, setSelectedLanguage] = useState(lang);

  useEffect(() => {
    if (selectedLanguage !== lang) {
      if (pathname?.includes("live")) {
        router.push(`/${selectedLanguage}/live?${searchParams?.toString()}`, {
          scroll: false,
        });
      } else {
        router.push(`/${selectedLanguage}`, {
          scroll: false,
        });
      }
    }
  }, [selectedLanguage]);

  return (
    <form className="max-w-sm mx-auto" method="GET">
      <select
        id="states"
        className="border  text-sm rounded-e-lg border-s-gray-700 border-s-2 focus:ring-blue-500 block w-full bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:border-blue-500 h-10 rounded-lg p-2"
        defaultValue={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </form>
  );
}
