import { useTranslations, useLocale } from "next-intl";
import React from "react";
import ChannelListViewSection from "./components/ChannelListViewSection";
import {
  CHANNEL_LIST,
  COUNTRY,
  COUNTRY_LIST,
  ChannelType,
  ZONE,
} from "../../constants";
import Channel from "./components/Channel";
import ActiveChannelLink from "./components/ActiveChannelLink";
import PlayerDisplay from "./components/PlayerDisplay";
import ChannelGridSection from "./components/ChannelGridSection";
import ChannelSearchSection from "./components/ChannelSearchSection";
import { URLSearchParamsType } from "../../shared/types";
import { MainLogo } from "../../shared/icons";

type LiveProps = {
  searchParams: URLSearchParamsType;
};

export default function Live({ searchParams }: LiveProps) {
  const t = useTranslations("Index");

  //   get zone by language
  const search = String(searchParams.s);
  const selectedZone = String(searchParams.zone);
  const selectedCountry = String(searchParams.country);
  const selectedLanguage = searchParams.lang;
  const selectedChannel = isNaN(Number(searchParams.channel))
    ? 0
    : Number(searchParams.channel);

  let zone: ZONE | ZONE[] | null = null;
  let country: COUNTRY | COUNTRY[] | null = null;
  let lang: string | string[] | null = null;

  const formattedURI = (uri: string) => {
    return uri
      .trim()
      .split(/\s*;\s*/)
      .filter((value) => value !== "")
      .map((value) => value.toUpperCase());
  };

  /** verify selected filter */
  if (selectedZone) {
    const multZone = formattedURI(selectedZone);

    let multZoneType: ZONE[] = [];

    multZone.forEach((z) => {
      if (ZONE[z as ZONE]) multZoneType.push(ZONE[z as ZONE]);
    });

    if (multZoneType.length) zone = multZoneType;
  }

  if (selectedCountry) {
    const multContry = formattedURI(selectedCountry);
    let multCountryType: COUNTRY[] = [];
    multContry.forEach((c) => {
      if (COUNTRY[c as COUNTRY]) multCountryType.push(COUNTRY[c as COUNTRY]);
    });
    if (multCountryType.length) country = multCountryType;
  }

  if (!zone?.length && !country?.length) {
    lang = selectedLanguage ? selectedLanguage : useLocale();
  }

  /** set channel list */
  const getChannelsByZone = (zones: ZONE[]) => {
    const channels = zones.map((zone) => {
      return Object.entries(CHANNEL_LIST[zone]).map(
        ([_, COUNTRY_ARRAY]) => COUNTRY_ARRAY
      );
    });
    return (
      zones.length > 1
        ? channels.flat(Infinity).map((c, i) => ({ ...c, id: i }))
        : channels
    ).flat(Infinity) as ChannelType[];
  };

  const getChannelsbyCountries = (countries: COUNTRY[]) => {
    const channels = countries.map((country) => {
      const zone = COUNTRY_LIST[country].zone;
      return CHANNEL_LIST[zone][country];
    });

    return (
      countries.length > 1
        ? channels.flat(Infinity).map((c, i) => ({ ...c, id: i }))
        : channels
    ).flat(Infinity) as ChannelType[];
  };

  let channels: ChannelType[] | null = null;
  let searchChannels: ChannelType[] | null = [];

  if (zone?.length && !country) {
    channels = getChannelsByZone(zone);
  } else if (country?.length) {
    channels = getChannelsbyCountries(country);
  } else {
    // get channels by language
  }

  if (search) {
    let filteredChannels: ChannelType[] = [];
    let allChannels: ChannelType[] = [];

    channels?.forEach((c) => {
      if (c.channelName.toLowerCase().includes(search.toLowerCase())) {
        filteredChannels = c.channelName
          .toLowerCase()
          .startsWith(search.toLowerCase())
          ? [c, ...filteredChannels]
          : [...filteredChannels, c];
      } else {
        allChannels.push(c);
      }
    });

    searchChannels = [...filteredChannels, ...allChannels];
  }

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen w-full my-8">
      <ChannelListViewSection>
        {channels?.map((channel, i) => (
          <Channel key={i} channel={channel} searchParams={searchParams} />
        ))}
        <></>
      </ChannelListViewSection>

      {channels && selectedChannel < channels?.length && (
        <>
          <ActiveChannelLink channel={channels[selectedChannel]} />
          <PlayerDisplay channel={channels[selectedChannel]} />
          <ChannelSearchSection searchParams={searchParams} />
          <ChannelGridSection
            channels={search ? searchChannels : channels}
            searchParams={searchParams}
          />
        </>
      )}

      {channels && selectedChannel > channels?.length && (
        <div className="w-full h-screen flex flex-col justify-center items-center p-4 text-center gap-2">
          <MainLogo className="w-32 h-32" />
          <div className="text-white text-2xl animate-pulse">
            {t("channel_404")}
          </div>
        </div>
      )}
    </div>
  );
}
