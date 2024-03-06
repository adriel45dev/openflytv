"use client";
import {
  COUNTRY,
  COUNTRY_LIST,
  CountryInfo,
  ZONE,
  ZONE_LIST,
  ZoneInfo,
} from "@/app/[locale]/constants";
import React, { useEffect, useState } from "react";
import { URLSearchParamsType } from "@/app/[locale]/shared/types";
import ButtonFilters from "./ButtonFilters";
import ListFilters from "./ListFilters";
import { FilterEnum } from "@/app/[locale]/shared/enum";
import { Formats, RichTranslationValues, TranslationValues } from "next-intl";

export default function Filters({
  searchParams,
  t_country,
  t_zone,
  t_countries,
  t_zones,
}: {
  searchParams: URLSearchParamsType;
  t_country: string;
  t_zone: string;
  t_countries: { [key: string]: string };
  t_zones: { [key: string]: string };
}) {
  const [dropdownStateCountries, setDropdownStateCountries] = useState(false);
  const [dropdownStateZones, setDropdownStateZones] = useState(false);

  const [dropdown, setDropdown] = useState({
    ["countries"]: false,
    ["zones"]: false,
  });

  type FilterCountryListType = CountryInfo & { state: boolean };

  const [filterCountryList, setFilterCountryList] = useState<
    FilterCountryListType[]
  >([]);
  const [filterZoneList, setFilterZoneList] = useState<ZoneInfo[]>([]);

  const contrySearchParams: URLSearchParamsType = {
    country: filterCountryList
      .filter((c) => c.state)
      .map((c) => c.country.toLowerCase())
      .join(";"),
  };

  const zoneSearchParams: URLSearchParamsType = {
    zone: filterZoneList
      .filter((z) => z.state)
      .map((z) => z.zone.toLowerCase())
      .join(";"),
  };

  useEffect(() => {
    if (filterCountryList.length <= 0) {
      const COUNTRY_LIST_FILTER = Object.keys(COUNTRY_LIST).map((KEY_C) => ({
        ...COUNTRY_LIST[KEY_C as COUNTRY],
        state: false,
      }));
      setFilterCountryList(COUNTRY_LIST_FILTER);
    }

    if (filterZoneList.length <= 0) {
      const ZONE_LIST_FILTER = Object.keys(ZONE_LIST).map(
        (KEY_Z) => ZONE_LIST[KEY_Z as ZONE]
      );
      setFilterZoneList(ZONE_LIST_FILTER);
    }
  }, []);

  return (
    <>
      <ButtonFilters
        title="country"
        t_title={t_country}
        dropdown={dropdownStateCountries}
        setDropdown={setDropdownStateCountries}
        oppositeDropdown={setDropdownStateZones}
        searchFilter={contrySearchParams}
        searchParams={searchParams}
      >
        {filterCountryList.map((country, i) => (
          <ListFilters
            key={i}
            data={country}
            setFilterList={setFilterCountryList}
            filterType={FilterEnum.country}
            t_list_itens={t_countries}
          />
        ))}
      </ButtonFilters>

      <ButtonFilters
        title="zone"
        t_title={t_zone}
        dropdown={dropdownStateZones}
        setDropdown={setDropdownStateZones}
        oppositeDropdown={setDropdownStateCountries}
        searchFilter={zoneSearchParams}
        searchParams={searchParams}
      >
        {filterZoneList.map((zone, i) => (
          <ListFilters
            key={i}
            data={zone}
            setFilterList={setFilterZoneList}
            filterType={FilterEnum.zone}
            t_list_itens={t_zones}
          />
        ))}
      </ButtonFilters>
    </>
  );
}
