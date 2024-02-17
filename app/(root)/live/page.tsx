"use client";
import React, { useEffect, useState } from "react";
import HLSPlayer from "@/app/components/HLSPlayer";
import {
  CHANNEL_LIST,
  ChannelType,
  TRANSMISSION_TYPE,
  ZONE,
  COUNTRY,
  COUNTRY_LIST,
  CountryInfo,
  ZONE_LIST,
  ZoneInfo,
} from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { MainLogo, PlayStreamIcon } from "@/app/shared/icons";
import SectionView from "@/app/components/SectionView";
import YoutubePlayer from "@/app/components/YoutubePlayer";
import IframePlayer from "@/app/components/IframePlayer";
import { useSearchParams } from "next/navigation";

type FilterCountryListType = CountryInfo & { state: boolean };

const fetchStreamUrl = async (inputUrl: string) => {
  const response = await fetch(
    `/api/video?url=${encodeURIComponent(inputUrl)}`
  );
  const data = await response.json();
  if (data.m3u8Url) {
    return data.m3u8Url;
  } else {
    return "";
  }
};

const PlayChannelOut = ({ transmissionSRC }: { transmissionSRC: string }) => {
  return (
    <div className="h-60 sm:min-h-screen w-full flex flex-col py-4 px-1 sm:px-16">
      <Link
        href={transmissionSRC}
        target="_blank"
        className="flex-1 bg-slate-950 rounded-lg justify-center items-center flex relative shadow-sm shadow-green-400 cursor-pointer"
      >
        <PlayStreamIcon className="w-20 h-20 text-green-400 animate-pulse hover:text-blue-400" />

        <button className="absolute bg-gray-900 bottom-0 w-full h-10 rounded-lg flex justify-between items-center px-4 ">
          <span className="text-gray-200 folt-bold text-xs flex justify-center items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" /> LIVE
          </span>
        </button>
      </Link>
    </div>
  );
};

const LoadingChannel = ({
  channelURL,
  channelConection,
}: {
  channelURL: string;
  channelConection: boolean;
}) => {
  return (
    <div className="p-6 flex w-full flex-1">
      <div
        className={`w-full min-h-full gap-2 px-2 py-8 sm:p-8  flex flex-col sm:flex-row justify-center items-center rounded-lg ${
          channelConection ? "bg-green-400" : "bg-red-400"
        }`}
      >
        <MainLogo className="w-36 h-36 sm:w-96 sm:h-96" />

        <div className="text-2xl sm:text-4xl max-w-full flex flex-col flex-wrap text-slate-700 justify-center items-center gap-2 text-center break-words ">
          {channelConection ? (
            <span className="text-center animate-pulse">
              Estamos estabelecendo uma conexão. Agurde ou vá para o site do
              canal.
            </span>
          ) : (
            <span className="text-center animate-pulse">
              Não foi possível estabelecer a conexão. Escolha outro canal ou
              assista ao vivo no site.
            </span>
          )}

          <Link
            className="text-black font-extrabold max-w-full text-lg sm:text-4xl"
            href={channelURL}
          >
            {channelURL.replace("https://www.", "").replace("https://", "")}
          </Link>
        </div>
      </div>
    </div>
  );
};

type FilterChannelListProps = {
  filterCountryList: FilterCountryListType[];
  setFilterCountryList: React.Dispatch<
    React.SetStateAction<FilterCountryListType[]>
  >;
  filterZoneList: ZoneInfo[];
  setFilterZoneList: React.Dispatch<React.SetStateAction<ZoneInfo[]>>;
  hanldeClearFilter: () => void;
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput = ({
  searchInputValue,
  setSearchInputValue,
}: {
  searchInputValue: string;
  setSearchInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInputValue(value);
  };
  return (
    <form className="w-full">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only text-white"
      >
        Search
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
          id="default-search"
          className="block w-full p-2 ps-10 text-sm  border  rounded-lg   bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Channels"
          onChange={(e) => handleSearchInput(e)}
          value={searchInputValue}
        />
        <button
          type="button"
          className="text-white absolute end-2.5 bottom-2 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-2 py-0.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};
const FilterChannelList = ({
  filterCountryList,
  setFilterCountryList,
  filterZoneList,
  setFilterZoneList,
  hanldeClearFilter,
  searchInputValue,
  setSearchInputValue,
}: FilterChannelListProps) => {
  const [isFilterCountryActive, setIsFilterCountryActive] = useState(false);
  const [isFilterZoneActive, setIsFilterZoneActive] = useState(false);

  const ListCountryItem = ({ country }: { country: FilterCountryListType }) => {
    return (
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-600">
          <input
            id={`checkbox_${country.name}`}
            type="checkbox"
            onChange={() =>
              setFilterCountryList((prevCountry) =>
                prevCountry.map((c) =>
                  c.country == country.country
                    ? { ...country, state: !country.state }
                    : c
                )
              )
            }
            checked={country.state}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
          />
          <label
            htmlFor={`checkbox_${country.name}`}
            className="w-full ms-2 text-sm font-medium rounded text-gray-300 flex items-center gap-2"
          >
            {country.name}

            <span className="bg-blue-600 py-1 px-2 rounded-lg text-xs flex justify-center items-center font-bold">
              {country.channelsCount}
            </span>
          </label>
        </div>
      </li>
    );
  };

  const ListZoneItem = ({ zone }: { zone: ZoneInfo }) => {
    return (
      <li>
        <div className="flex items-center p-2 rounded hover:bg-gray-600">
          <input
            id={`checkbox_${zone.name}`}
            type="checkbox"
            onChange={() =>
              setFilterZoneList((prevZone) =>
                prevZone.map((z) =>
                  z.zone == zone.zone ? { ...zone, state: !zone.state } : z
                )
              )
            }
            checked={zone.state}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
          />
          <label
            htmlFor={`checkbox_${zone.name}`}
            className="w-full ms-2 text-sm font-medium rounded text-gray-300 flex items-center gap-2"
          >
            {zone.name}

            <span className="bg-blue-600 py-1 px-2 rounded-lg text-xs flex justify-center items-center font-bold">
              {zone.channelsCount}
            </span>
          </label>
        </div>
      </li>
    );
  };

  const ButtonFilter = ({
    title,
    children,
    setDropdownState,
    setDropdownOppositeState,
    dropdownState,
  }: {
    title: string;
    children: React.ReactNode;
    setDropdownState: (value: boolean) => void;
    setDropdownOppositeState: (value: boolean) => void;
    dropdownState: boolean;
  }) => {
    const ArrowDownIcon = () => {
      return (
        <svg
          className="w-2.5 h-2.5 ms-2.5 group-hover:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      );
    };

    const ClearListIcon = () => {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2"
        >
          <path
            opacity="0.5"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H11C11.4142 10.25 11.75 10.5858 11.75 11C11.75 11.4142 11.4142 11.75 11 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"
            fill="currentColor"
          />
          <path
            d="M14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697L17.5 12.4393L19.4697 10.4697C19.7626 10.1768 20.2374 10.1768 20.5303 10.4697C20.8232 10.7626 20.8232 11.2374 20.5303 11.5303L18.5607 13.5L20.5303 15.4697C20.8232 15.7626 20.8232 16.2374 20.5303 16.5303C20.2374 16.8232 19.7626 16.8232 19.4697 16.5303L17.5 14.5607L15.5303 16.5303C15.2374 16.8232 14.7626 16.8232 14.4697 16.5303C14.1768 16.2374 14.1768 15.7626 14.4697 15.4697L16.4393 13.5L14.4697 11.5303C14.1768 11.2374 14.1768 10.7626 14.4697 10.4697Z"
            fill="currentColor"
          />
        </svg>
      );
    };

    const handleDropDown = () => {
      setDropdownState(!dropdownState);
      setDropdownOppositeState(false);
    };

    return (
      <div className="group w-full" key={"button_filter"}>
        <button
          id={`sort${title}`}
          data-dropdown-toggle={`dropdown${title}`}
          className="inline-flex justify-between items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none  border-b group-hover:bg-blue-700 focus:ring-blue-800 w-full"
          type="button"
          onClick={() => handleDropDown()}
        >
          {title}
          <ArrowDownIcon />
        </button>
        <div
          id={`dropdown${title}`}
          className={`absolute min-w-full pt-4 left-0 ease-in-out duration-300 ${
            dropdownState ? "opacity-100 z-10" : "opacity-0 -z-50"
          }`}
        >
          <div className="bg-gray-700 rounded-lg shadow">
            <ul
              className="h-max px-3 pb-3 overflow-y-auto text-sm pt-4 text-gray-200"
              aria-labelledby={`${title}Dropdown`}
            >
              {children}
            </ul>
            <a
              onClick={() => hanldeClearFilter()}
              className="cursor-pointer flex items-center p-3 text-sm font-bold border-t rounded-b-lg border-gray-600  bg-slate-800 hover:bg-gray-600 text-white hover:underline"
            >
              {/* Clear List Icon */}
              <ClearListIcon />
              Limpar Lista
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex text-white w-full px-4 justify-center items-center">
      <div className="flex flex-col sm:flex-row bg-slate-800 w-full p-2 rounded-lg gap-2 relative justify-center items-center">
        <SearchInput
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
        />
        <div className="flex gap-2 w-full">
          {/* <ButtonFilter title="Sort">
            <ListItem name="" />
          </ButtonFilter> */}

          <ButtonFilter
            title="Países"
            dropdownState={isFilterCountryActive}
            setDropdownState={setIsFilterCountryActive}
            setDropdownOppositeState={setIsFilterZoneActive}
          >
            {filterCountryList.map((country, i) => (
              <ListCountryItem country={country} key={i} />
            ))}
          </ButtonFilter>
          <ButtonFilter
            title="Região"
            dropdownState={isFilterZoneActive}
            setDropdownState={setIsFilterZoneActive}
            setDropdownOppositeState={setIsFilterCountryActive}
          >
            {filterZoneList.map((zone, i) => (
              <ListZoneItem zone={zone} key={i} />
            ))}
          </ButtonFilter>
        </div>
      </div>
    </div>
  );
};

export default function Live() {
  const Channel = ({ channel }: { channel: ChannelType }) => {
    return (
      <button
        onClick={() => {
          const [channelS] = channels.filter((c) => c.id == channel.id);
          setSelectedChannel(channelS);
        }}
        className={`group h-full relative flex flex-col justify-center items-center gap-2 bg-gray-200 border p-4 rounded-lg hover:bg-slate-900 w-full border-b-8 ${
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
            selectedChannel.id == channel.id ? "flex" : "hidden"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          <div className="text-xs text-bold text-white">AO VIVO</div>
        </div>
      </button>
    );
  };

  const [channels, setChannels] = useState<ChannelType[]>(
    CHANNEL_LIST[ZONE.SOUTH_AMERICA][COUNTRY.BRAZIL]
  );

  const [selectedChannel, setSelectedChannel] = useState<ChannelType>(
    CHANNEL_LIST[ZONE.SOUTH_AMERICA][COUNTRY.BRAZIL][0]
  );

  // const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);

  const [channelConection, setChannelConection] = useState(true);

  const [filterCountryList, setFilterCountryList] = useState<
    FilterCountryListType[]
  >([]);

  const [filterZoneList, setFilterZoneList] = useState<ZoneInfo[]>([]);

  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    if (searchInputValue) {
      const PREV_CHANNELS = [...channels];
      let filteredChannels: ChannelType[] = [];
      let allChannels: ChannelType[] = [];

      PREV_CHANNELS.forEach((c) => {
        if (
          c.channelName.toLowerCase().includes(searchInputValue.toLowerCase())
        ) {
          filteredChannels = c.channelName
            .toLowerCase()
            .startsWith(searchInputValue.toLowerCase())
            ? [c, ...filteredChannels]
            : [...filteredChannels, c];
        } else {
          allChannels.push(c);
        }
      });

      const NEW_CHANNELS = [...filteredChannels, ...allChannels];
      setChannels(NEW_CHANNELS);
    } else {
      // sort channels by id
      const PREV_CHANNELS = [...channels];

      const NEW_CHANNELS = PREV_CHANNELS.sort((a, b) => {
        return a.id - b.id;
      });

      setChannels(NEW_CHANNELS);
    }
  }, [searchInputValue]);

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

  useEffect(() => {
    const selectedCountryList = filterCountryList.filter((c) => c.state);
    if (selectedCountryList.length > 0) {
      const NEW_CHANNEL_LIST = selectedCountryList
        .map((c) => CHANNEL_LIST[c.zone as ZONE][c.country as COUNTRY])
        .flat()
        .map((c, i) => ({ ...c, id: i }));

      setChannels(NEW_CHANNEL_LIST);
      setSelectedChannel(NEW_CHANNEL_LIST[0]);
      setFilterZoneList((prevZone) =>
        prevZone.map((z) => ({ ...z, state: false }))
      );
    }
  }, [filterCountryList]);

  useEffect(() => {
    const selectedZoneList = filterZoneList.filter((z) => z.state);
    if (selectedZoneList.length > 0) {
      const NEW_CHANNEL_LIST = selectedZoneList
        .map((z) =>
          Object.keys(CHANNEL_LIST[z.zone]).map(
            (KEY_C) => CHANNEL_LIST[z.zone][KEY_C as COUNTRY]
          )
        )
        .flat(Infinity) as ChannelType[];

      setChannels(NEW_CHANNEL_LIST);
      setSelectedChannel(NEW_CHANNEL_LIST[0]);
      setFilterCountryList((prevCountry) =>
        prevCountry.map((c) => ({ ...c, state: false }))
      );
    }
  }, [filterZoneList]);

  useEffect(() => {
    (async () => {
      if (
        selectedChannel.transmissionType == TRANSMISSION_TYPE.STREAM &&
        !selectedChannel.transmissionSRC
      ) {
        setChannelConection(true);
        const streamURL = await fetchStreamUrl(selectedChannel.channelURL);
        if (streamURL) {
          setSelectedChannel((prev) => ({
            ...prev,
            transmissionSRC: streamURL,
          }));
          const prevChannels = [...channels];
          const newChannnel = {
            ...selectedChannel,
            transmissionSRC: streamURL,
          };
          const newChannels = prevChannels.filter(
            (c) => c.id != selectedChannel.id
          );
          setChannels([newChannnel, ...newChannels]);

          /** set channels list */
        } else {
          setChannelConection(false);
        }
      }
    })();
  }, [selectedChannel]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const selectedCountry = searchParams?.get("country");

    if (selectedCountry) {
      const country = COUNTRY_LIST[selectedCountry as COUNTRY];
      if (country) {
        setChannels(CHANNEL_LIST[country.zone][country.country]);
        setSelectedChannel(CHANNEL_LIST[country.zone][country.country][0]);
      }
    }
  }, []);

  const hanldeClearFilter = () => {
    setFilterZoneList((prevZone) =>
      prevZone.map((z) => ({ ...z, state: false }))
    );

    setFilterCountryList((prevCountry) =>
      prevCountry.map((c) => ({ ...c, state: false }))
    );
    setSelectedChannel(CHANNEL_LIST[ZONE.SOUTH_AMERICA][COUNTRY.BRAZIL][0]);
    setChannels(CHANNEL_LIST[ZONE.SOUTH_AMERICA][COUNTRY.BRAZIL]);
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen w-full my-8">
      <SectionView>
        {channels.map((channel, i) => (
          <Channel key={i} channel={channel} />
        ))}
      </SectionView>

      <div className="my-2 flex max-w-full justify-center items-center border border-slate-600  rounded-full px-6 gap-2 hover:bg-slate-700">
        <div>
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse "></div>
        </div>
        <Link
          target="_blank"
          className="text-white text-md max-w-full break-words text-center"
          href={selectedChannel.channelURL}
        >
          {selectedChannel.channelName}
        </Link>
      </div>

      <div className="w-full sticky top-0 z-50 sm:relative sm:z-0">
        {selectedChannel.transmissionType == TRANSMISSION_TYPE.YOUTUBE && (
          <YoutubePlayer channelId={selectedChannel.transmissionSRC} />
        )}

        {selectedChannel.transmissionType == TRANSMISSION_TYPE.IFRAME && (
          <IframePlayer src={selectedChannel.transmissionSRC} />
        )}

        {selectedChannel.transmissionType == TRANSMISSION_TYPE.STREAM &&
          (selectedChannel.transmissionSRC ? (
            <HLSPlayer src={selectedChannel.transmissionSRC} />
          ) : (
            <LoadingChannel
              channelURL={selectedChannel.channelURL}
              channelConection={channelConection}
            />
          ))}

        {selectedChannel.transmissionType == TRANSMISSION_TYPE.CHANNEL && (
          <PlayChannelOut transmissionSRC={selectedChannel.transmissionSRC} />
        )}
      </div>

      <FilterChannelList
        filterCountryList={filterCountryList}
        setFilterCountryList={setFilterCountryList}
        filterZoneList={filterZoneList}
        setFilterZoneList={setFilterZoneList}
        hanldeClearFilter={hanldeClearFilter}
        setSearchInputValue={setSearchInputValue}
        searchInputValue={searchInputValue}
      />

      <div className="w-full px-6 flex items-center justify-between">
        <div className="text-gray-400">Filters:</div>
        <div className="flex gap-2 justify-center items-center text-white flex-wrap">
          {filterCountryList
            .filter((c) => c.state)
            .map((c) => (
              <div className="bg-slate-700 rounded-full px-2 py-1 text-xs">
                {c.name}
              </div>
            ))}

          {filterZoneList
            .filter((z) => z.state)
            .map((z) => (
              <div className="bg-orange-500 rounded-full px-2 py-1 text-xs">
                {z.name}
              </div>
            ))}
        </div>
      </div>

      {/* channel list */}
      <div className="w-full flex flex-col justify-center items-center">
        {/* <h2 className="text-white text-2xl font-bold mt-8">Lista de canais</h2> */}

        <ul className="flex-col w-full gap-2 p-4 grid grid-cols-3 sm:grid-cols-5">
          {channels.map((c, i) => (
            <li key={i}>
              <Channel channel={c}></Channel>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
