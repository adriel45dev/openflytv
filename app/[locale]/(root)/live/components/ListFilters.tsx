import React from "react";
import {
  FilterCountryListType,
  FilterZoneListType,
} from "@/app/[locale]/shared/types";
import { FilterEnum } from "@/app/[locale]/shared/enum";

type setFilterCountryListType = React.Dispatch<
  React.SetStateAction<FilterCountryListType[]>
>;
type setFilterZoneListType = React.Dispatch<
  React.SetStateAction<FilterZoneListType[]>
>;

type ListFiltersProps = {
  data: FilterCountryListType | FilterZoneListType;
  setFilterList: setFilterCountryListType | setFilterZoneListType;
  filterType: FilterEnum;
  t_list_itens: { [key: string]: string };
};
export default function ListFilters({
  data,
  setFilterList,
  filterType,
  t_list_itens,
}: ListFiltersProps) {
  const handleFilterList = {
    [FilterEnum.country]: () => {
      const country = data as FilterCountryListType;
      const setFilterCountry = setFilterList as setFilterCountryListType;
      setFilterCountry((prevCountry) =>
        prevCountry.map((c) => {
          return c.country == country.country
            ? { ...country, state: !country.state }
            : c;
        })
      );
    },
    [FilterEnum.zone]: () => {
      const zone = data as FilterZoneListType;
      const setFilterZone = setFilterList as setFilterZoneListType;
      setFilterZone((prevZone) =>
        prevZone.map((z) => {
          return z.zone == zone.zone ? { ...zone, state: !zone.state } : z;
        })
      );
    },
  };

  const country = data as FilterCountryListType;
  const zone = data as FilterZoneListType;

  return (
    <li>
      <div className="flex items-center p-2 rounded hover:bg-gray-600">
        <input
          id={`checkbox_${data.name}`}
          type="checkbox"
          onChange={() => handleFilterList[filterType]()}
          checked={data.state}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
        />
        <label
          htmlFor={`checkbox_${data.name}`}
          className="w-full ms-2 text-sm font-medium rounded text-gray-300 flex items-center gap-2"
        >
          {
            t_list_itens[
              filterType == FilterEnum.country ? country.country : zone.zone
            ]
          }

          <span className="bg-blue-600 py-1 px-2 rounded-lg text-xs flex justify-center items-center font-bold">
            {data.channelsCount}
          </span>
        </label>
      </div>
    </li>
  );
}
