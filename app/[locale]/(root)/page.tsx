import Image from "next/image";
import { OpenTVLogoIcon, PlayStreamIcon } from "../shared/icons";
import { CHANNEL_LIST, COUNTRY_LIST, CountryInfo } from "../constants";
import Link from "next/link";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const getAllChannelsData = () => {
  type ChannelDataType = {
    channelName: string;
    channelLogo: string;
  };

  const CHANNELS_DATA: ChannelDataType[] = [];
  for (const [_, ZONE] of Object.entries(CHANNEL_LIST)) {
    for (const [_, COUNTRY] of Object.entries(ZONE)) {
      COUNTRY.forEach((channel) => {
        const { channelName, channelLogo } = channel;
        CHANNELS_DATA.push({ channelName, channelLogo });
      });
    }
  }
  return CHANNELS_DATA;
};

const getAllCountryList = () => {
  return Object.entries(COUNTRY_LIST).map(
    ([_, COUNTRY]) => COUNTRY
  ) as CountryInfo[];
};

export default function Home() {
  const t = useTranslations("Index");
  const l = useLocale();

  const InfinityScrollViewChannels = () => {
    const ListItemChannel = ({ alt, src }: { alt: string; src: string }) => {
      return (
        <li>
          <div className="w-12 h-12 relative overflow-hidden rounded-full opacity-90 ">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="32px"
              style={{ objectFit: "contain" }}
              className="hover:scale-105 bg-white p-2 w-24"
            />
          </div>
        </li>
      );
    };

    const ListChannel = () => {
      return (
        <ul
          x-ref="logos"
          className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
        >
          {getAllChannelsData().map((ch, i) => (
            <ListItemChannel
              alt={ch.channelName}
              src={ch.channelLogo}
              key={i}
            />
          ))}
        </ul>
      );
    };

    return (
      <div
        x-data="{}"
        x-init="$nextTick(() => {
    let ul = $refs.logos;
    ul.insertAdjacentHTML('afterend', ul.outerHTML);
    ul.nextSibling.setAttribute('aria-hidden', 'true');
})"
        className=" border-b border-green-400 shadow-white py-2 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      >
        <ListChannel />
        <ListChannel />
        <ListChannel />
      </div>
    );
  };

  const MainLogo = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <OpenTVLogoIcon className="text-white w-36 h-36" />
        <h1 className="text-4xl text-white">
          <span className="text-green-400 font-extrabold">OPEN</span>FLYTV
        </h1>
        <div className="text-normal text-gray-300 animate-pulse">
          {t("slogan")}
        </div>
      </div>
    );
  };

  const WatchNowButton = () => {
    return (
      <Link
        aria-label="Assistir Agora"
        href={`${l}/live`}
        className="group w-full hover:border-green-400 flex justify-center items-center bg-slate-900 rounded-lg p-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] border border-slate-400"
      >
        <div className="text-white text-lg px-4 flex gap-2 justify-center items-center rounded-lg w-full">
          <PlayStreamIcon className="w-10 h-10 text-white group-hover:text-green-400" />
          <div className="group-hover:text-green-400">{t("watch")}</div>
        </div>
      </Link>
    );
  };

  const ContryListItem = ({ country }: { country: CountryInfo }) => {
    return (
      <Link
        href={`${l}/live/?country=${country.country.toLowerCase()}`}
        className="flex flex-col justify-center items-center w-full bg-gray-600 bg-opacity-25 p-1 rounded-lg relative hover:bg-green-500"
      >
        <Image
          src={country.flag}
          alt={country.name}
          width={80}
          height={80}
          className="w-24"
        />

        <div className=" bg-slate-600 w-full bg-opacity-20 h-full flex justify-center items-center rounded-lg">
          <div className="text-md text-white  ">{t(country.country)}</div>
        </div>

        <div className="absolute -top-2 right-0 bg-blue-600 rounded-full p-1 flex justify-center items-center min-w-6 h-6">
          <div className="text-white text-xs font-bold">
            {country.channelsCount}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen bg-gray-900 px-4">
      <Head>
        <title>TV Grátis - Asisitr TV ao vivo | TV Online - OPENFLYTV</title>
        <meta
          name="description"
          content="Assista a diversos canais de TV gratuitos e abertos"
          key="tv"
        />

        <h1>
          TV ONLINE | TV GRÁTIS | CANAIS ABERTOS | OPENTV | FREETV | LIVE TV{" "}
        </h1>

        {getAllChannelsData().map((c, i) => (
          <p key={i}>{`${c.channelName.toUpperCase()} AO VIVO`}</p>
        ))}
      </Head>
      <InfinityScrollViewChannels />
      <MainLogo />
      <WatchNowButton />

      <div className="w-full  rounded-lg grid grid-cols-3 sm:grid-cols-6 justify-center items-center gap-2 p-2">
        {getAllCountryList().map((COUNTRY, i) => (
          <ContryListItem country={COUNTRY} key={i} />
        ))}
      </div>
    </div>
  );
}
