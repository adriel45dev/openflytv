import React from "react";
import SearchInput from "./SearchInput";
import { useTranslations } from "next-intl";
import Filters from "./Filters";
import { URLSearchParamsType } from "@/app/[locale]/shared/types";
import { COUNTRY, COUNTRY_LIST, ZONE_LIST } from "@/app/[locale]/constants";

type FilterMenuProps = {
  searchParams: URLSearchParamsType;
};

export default function ChannelSearchSection({
  searchParams,
}: FilterMenuProps) {
  const t = useTranslations("Index");

  let t_countries: { [key: string]: string } = {};
  let t_zones: { [key: string]: string } = {};

  Object.entries(COUNTRY_LIST).forEach(([_, ENTRY_COUNTRY]) => {
    t_countries = {
      ...t_countries,
      [String(ENTRY_COUNTRY.country)]: t(ENTRY_COUNTRY.country),
    };
  });

  Object.entries(ZONE_LIST).forEach(([_, ENTRY_ZONE]) => {
    t_zones = { ...t_zones, [String(ENTRY_ZONE.zone)]: t(ENTRY_ZONE.zone) };
  });

  return (
    <div
      className="flex text-white w-full px-4 justify-center items-center"
      id="filter-menu"
    >
      <div className="flex flex-col sm:flex-row bg-slate-800 w-full p-2 rounded-lg gap-2 relative justify-center items-center">
        <SearchInput
          searchParams={searchParams}
          t_search={t("search")}
          t_search_channels={t("search_channels")}
        />

        <div className="flex gap-2 w-full">
          {/* Filters | Country | Zone | Language */}
          <Filters
            searchParams={searchParams}
            t_country={t("country")}
            t_zone={t("zone")}
            t_countries={t_countries}
            t_zones={t_zones}
          />
        </div>
      </div>
    </div>
  );
}
