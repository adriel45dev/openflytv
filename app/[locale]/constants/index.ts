export type ChannelType = {
  id: number;
  channelName: string;
  channelURL: string;
  channelLogo: string;
  zone: ZONE;
  country: COUNTRY;
  transmissionType: TRANSMISSION_TYPE;
  transmissionSRC: string;
  lang: LANGUAGE;
};

export enum LANGUAGE {
  en = "en",
  pt = "pt",
  es = "es",
}

export enum TRANSMISSION_TYPE {
  YOUTUBE = "YOUTUBE",
  IFRAME = "IFRAME",
  STREAM = "STREAM",
  CHANNEL = "CHANNEL",
}
export enum ZONE {
  // PACIFIC = "PACIFIC",
  // ASIA = "ASIA",
  // MIDDLE_EAST = "MIDDLE_EAST",
  // EUROPE = "EUROPE",
  // AFRICA = "AFRICA",
  SOUTH_AMERICA = "SOUTH_AMERICA",
  // NORTH_AMERICA = "NORTH_AMERICA",
}

export enum COUNTRY {
  BRAZIL = "BRAZIL",
  ARGENTINA = "ARGENTINA",
  // CHILE = "CHILE",
  // BOLIVIA = "BOLIVIA",
  // COLOMBIA = "COLOMBIA",
  // ECUADOR = "ECUADOR",
  // FALKLAND_ISLANDS = "FALKLAND_ISLANDS",
  // FRENCH_GUIANA = "FRENCH_GUIANA",
  // GUYANA = "GUYANA",
  // PARAGUAY = "PARAGUAY",
  // PERU = "PERU",
  // URUGUAY = "URUGUAY",
  // VENEZUELA = "VENEZUELA",
}

export type CountryInfo = {
  name: string;
  flag: string;
  zone: ZONE;
  country: COUNTRY;
  channelsCount: number;
};

export type ZoneInfo = {
  name: string;
  zone: ZONE;
  channelsCount: number;
  state: boolean;
};

type ZoneList = {
  [key in ZONE]: ZoneInfo;
};

type CountryList = {
  [key in COUNTRY]: CountryInfo;
};

const CHANNEL_LOGO_PATH = "/channel-logo";

const CHANNEL_LIST_BRAZIL: ChannelType[] = [
  {
    id: 0,
    channelName: "SBT",
    channelURL: "https://www.sbt.com.br/ao-vivo",
    channelLogo: `${CHANNEL_LOGO_PATH}/sbt_svg.svg`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,
    transmissionType: TRANSMISSION_TYPE.YOUTUBE,
    transmissionSRC: "UC-kzuB1mP2LnmaXMPniKeyg",
    lang: LANGUAGE.pt,
  },
  {
    id: 1,
    channelName: "BAND",
    channelURL: "https://www.band.uol.com.br/ao-vivo",
    channelLogo: `${CHANNEL_LOGO_PATH}/band_svg.svg`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,
    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC:
      "https://geo.dailymotion.com/player/x9fev.html?video=k6H9TR1iSZWv30xaX2y&customConfig[customParams]=8804%252Fparceiros%252Fband%252Fao_vivo&customConfig[mute]=false",
    lang: LANGUAGE.pt,
  },
  {
    id: 2,
    channelName: "BAND FM",
    channelURL: "https://www.band.uol.com.br/band-fm",
    channelLogo: `${CHANNEL_LOGO_PATH}/band_fm_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC:
      "https://www.dailymotion.com/embed/video/k3WQuZUtEMtkX8yUtdY?autoplay=1",
    lang: LANGUAGE.pt,
  },
  {
    id: 3,
    channelName: "Rede União (Natal/RN)",
    channelURL: "https://www.uniaoplay.com.br",
    channelLogo: `${CHANNEL_LOGO_PATH}/rede_uniao_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC: "https://live.uniaoplus.com/hls/0gmf9QNc7bQ6V0Lu.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 4,
    channelName: "TVBRASIL",
    channelURL: "https://play.ebc.com.br/tvs",
    channelLogo: `${CHANNEL_LOGO_PATH}/tv_brasil_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://tvbrasil-stream.ebc.com.br/mux_video_ts/index-1.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 5,
    channelName: "1001 Noites",
    channelURL: "https://aovivo.1001noites.com.br/",
    channelLogo: `${CHANNEL_LOGO_PATH}/1001_noites_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://5e837408ea907.streamlock.net:1936/1001noites/smil:1001noites.smil/playlist.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 6,
    channelName: "AgroBrasil TV",
    channelURL: "https://www.agrobrasiltv.com.br/",
    channelLogo: `${CHANNEL_LOGO_PATH}/agro_brasil_tv_jpg.jpg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://server.flixtv.com.br/agrobrasiltv/agrobrasiltv/playlist.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 7,
    channelName: "AgroCanal",
    channelURL: "https://sba1.com/aovivo/agrocanal",
    channelLogo: `${CHANNEL_LOGO_PATH}/agro_canal_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC: "https://equipea.com.br/player/?canal=agrocanal",
    lang: LANGUAGE.pt,
  },
  {
    id: 8,
    channelName: "Aratu On",
    channelURL: "https://aratuon.com.br/aovivo/",
    channelLogo: `${CHANNEL_LOGO_PATH}/aratuon_svg.svg`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://cdn.live.br1.jmvstream.com/w/LVW-8379/LVW8379_rIq6ZYiIiA/chunklist.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 9,
    channelName: "BR8 TV",
    channelURL: "https://br8news.com.br/#aovivo",
    channelLogo: `${CHANNEL_LOGO_PATH}/br8_tv_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://cdn.live.br1.jmvstream.com/w/LVW-11668/ngrp:LVW11668_wiJpjbMrks_all/chunklist_b978000.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 10,
    channelName: "Boa Vontade TV",
    channelURL: "https://www.boavontade.com/pt/tv",
    channelLogo: `${CHANNEL_LOGO_PATH}/boa_vontade_tv_png.png`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.YOUTUBE,
    transmissionSRC: "UCedt33latJW7StRfdF4-1FQ",
    lang: LANGUAGE.pt,
  },
  {
    id: 11,
    channelName: "BandNews TV",
    channelURL: "https://bandnewstv.uol.com.br/",
    channelLogo: `${CHANNEL_LOGO_PATH}/band_news_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.YOUTUBE,
    transmissionSRC: "UCoa-D_VfMkFrCYodrOC9-mA",
    lang: LANGUAGE.pt,
  },
  {
    id: 12,
    channelName: "Boas Novas",
    channelURL: "https://boasnovas.tv/aovivo/",
    channelLogo: `${CHANNEL_LOGO_PATH}/boas_novas_png.png`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://cdn.live.br1.jmvstream.com/w/LVW-9375/LVW9375_6i0wPBCHYc/chunklist.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 13,
    channelName: "Canal Educação Brasilia",
    channelURL:
      "https://www.gov.br/mec/pt-br/canal-educacao/videos/transmissao-ao-vivo-canal-educacao",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_educacao_brasilia_png.png`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC: "https://aovivo.ebc.com.br/embed-canaleducacao.html",
    lang: LANGUAGE.pt,
  },
  {
    id: 14,
    channelName: "Rede TV",
    channelURL: "https://www.redetvgo.com.br/live/LIV-8",
    channelLogo: `${CHANNEL_LOGO_PATH}/rede_tv_png.png`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://dtcatf1yeq90t.cloudfront.net/out/v1/474a19630faa47908e790373efc520d9/index_1.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 15,
    channelName: "Canal Gov",
    channelURL: "https://canalgov.ebc.com.br/ao-vivo",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_gov_png.png`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC:
      "https://aovivo.ebc.com.br/embed-canalgov.html?autoplay=1&v=2",
    lang: LANGUAGE.pt,
  },
  {
    id: 16,
    channelName: "Canal Libras",
    channelURL: "https://www.gov.br/mec/pt-br/canal-libras",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_libras_br_png.png`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC: "https://aovivo.ebc.com.br/embed-canallibras.html",
    lang: LANGUAGE.pt,
  },
  {
    id: 17,
    channelName: "Canal Rural",
    channelURL: "https://www.canalrural.com.br/ao-vivo/",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_rural_br_svg.svg`,

    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,

    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://607d2a1a47b1f.streamlock.net/crur/smil:canalrural.smil/playlist.m3u8",
    lang: LANGUAGE.pt,
  },
  {
    id: 18,
    channelName: "Canal Saúde",
    channelURL: "https://www.canalsaude.fiocruz.br/canal/aoVivo/",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_saude_png.png`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,
    transmissionType: TRANSMISSION_TYPE.IFRAME,
    transmissionSRC: "https://zoevideos.net/player/aovivo/982?autoPlay",
    lang: LANGUAGE.pt,
  },
  {
    id: 19,
    channelName: "Canal do Boi",
    channelURL: "https://sba1.com/aovivo/canaldoboi",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_do_boi_png.png`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,
    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://arkyvbre1g.zoeweb.tv/fiocruz/fiocruz.stream/chunklist.m3u8?checkedby:iptvcat.com",
    lang: LANGUAGE.pt,
  },
  {
    id: 20,
    channelName: "Canal do Criador",
    channelURL: "https://www.canaldocriador.com.br/",
    channelLogo: `${CHANNEL_LOGO_PATH}/canal_do_criador_svg.svg`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,
    transmissionType: TRANSMISSION_TYPE.STREAM,
    transmissionSRC:
      "https://607d2a1a47b1f.streamlock.net/crur/smil:canaldocriador/playlist.m3u8",
    lang: LANGUAGE.pt,
  },
];

const CHANNEL_LIST_ARGENTINA: ChannelType[] = [
  {
    id: 0,
    channelName: "TN Argentina",
    channelURL: "https://tn.com.ar/envivo/24hs/",
    channelLogo: `${CHANNEL_LOGO_PATH}/tn_argentina_png.png`,
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.ARGENTINA,
    transmissionType: TRANSMISSION_TYPE.YOUTUBE,
    transmissionSRC: "UCj6PcyLvpnIRT_2W_mwa9Aw",
    lang: LANGUAGE.es,
  },
];

const CHANNEL_LIST = {
  [ZONE.SOUTH_AMERICA]: {
    [COUNTRY.BRAZIL]: CHANNEL_LIST_BRAZIL,
    [COUNTRY.ARGENTINA]: CHANNEL_LIST_ARGENTINA,
  },
};

export const ZONE_LIST: ZoneList = {
  [ZONE.SOUTH_AMERICA]: {
    name: "South America",
    zone: ZONE.SOUTH_AMERICA,
    channelsCount: Object.keys(CHANNEL_LIST[ZONE.SOUTH_AMERICA])
      .map((KEY_C) => CHANNEL_LIST[ZONE.SOUTH_AMERICA][KEY_C as COUNTRY])
      .flat().length,
    state: false,
  },
};

export const COUNTRY_LIST: CountryList = {
  [COUNTRY.ARGENTINA]: {
    name: "Argentina",
    flag: "/flags/argentina-svg.svg",
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.ARGENTINA,
    channelsCount: CHANNEL_LIST_ARGENTINA.length,
  },

  [COUNTRY.BRAZIL]: {
    name: "Brazil",
    flag: "/flags/brazil-svg.svg",
    zone: ZONE.SOUTH_AMERICA,
    country: COUNTRY.BRAZIL,
    channelsCount: CHANNEL_LIST_BRAZIL.length,
  },
};

export { CHANNEL_LIST };
