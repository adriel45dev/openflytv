"use client";
import HLSPlayer from "@/app/components/HLSPlayer";
import IframePlayer from "@/app/components/IframePlayer";
import YoutubePlayer from "@/app/components/YoutubePlayer";
import { COUNTRY_LIST, ZONE_LIST } from "@/app/constants";
import React, { useState } from "react";

type FormInputType = {
  id: string;
  channelName: string;
  channelURL: string;
  channelLogo: string;
  zone: string;
  country: string;
  transmissionType: string;
  transmissionSRC: string;
};

const Attribute = ({
  name,
  children,
  value,
  handleForm,
}: {
  name: string;
  children?: React.ReactNode;
  value: string;
  handleForm: (value: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex gap-2">
      <label htmlFor={name} className="text-white">
        {name}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="w-full px-2 rounded-lg"
        list={name + "_list"}
        onChange={(e) => handleForm(e)}
        value={value}
      />
      {children}
    </div>
  );
};

export default function Manager() {
  const [formInput, setFormInput] = useState<FormInputType>({
    id: "",
    channelName: "",
    channelURL: "",
    channelLogo: "",
    zone: "",
    country: "",
    transmissionType: "",
    transmissionSRC: "",
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
    if (name == "channelName") {
      setFormInput((prev) => ({
        ...prev,
        channelLogo: value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[^a-zA-Z\s]/g, "")
          .replaceAll(" ", "_"),
      }));
    }
  };

  const getData = () => {
    return `{
    id:${formInput.id},
    channelName:"${formInput.channelName}",
    channelURL:"${formInput.channelURL}",
    channelLogo:\`\$\{CHANNEL_LOGO_PATH\}/${formInput.channelLogo}\`,
    zone:${formInput.zone},
    country:${formInput.country},
    transmissionType:${formInput.transmissionType},
    transmissionSRC:"${formInput.transmissionSRC}"
  }`;
  };

  const handleClear = () => {
    setFormInput((prev) => ({
      ...prev,
      ...{
        id: String(parseInt(prev.id) + 1),
        channelName: "",
        channelURL: "",
        channelLogo: "",
        transmissionType: "",
        transmissionSRC: "",
      },
    }));
  };

  return (
    <div className="w-full min-h-screen px-4 flex items-center flex-col gap-2">
      {/* CREATE CHANNEL */}
      <form className="p-4 bg-slate-700 w-full rounded-lg mt-6 flex flex-col gap-2">
        <Attribute handleForm={handleForm} name="id" value={formInput.id} />
        <Attribute
          handleForm={handleForm}
          name="channelName"
          value={formInput.channelName}
        />
        <Attribute
          handleForm={handleForm}
          name="channelURL"
          value={formInput.channelURL}
        />
        <Attribute
          handleForm={handleForm}
          name="channelLogo"
          value={formInput.channelLogo}
        />
        <Attribute handleForm={handleForm} name="zone" value={formInput.zone}>
          <datalist id="zone_list">
            {Object.entries(ZONE_LIST).map(([_, ZONE], i) => (
              <option value={`ZONE.${ZONE.zone}`} key={i}></option>
            ))}
          </datalist>
        </Attribute>
        <Attribute
          handleForm={handleForm}
          name="country"
          value={formInput.country}
        >
          <datalist id="country_list">
            {Object.entries(COUNTRY_LIST).map(([_, COUNTRY], i) => (
              <option value={`COUNTRY.${COUNTRY.country}`} key={i}></option>
            ))}
          </datalist>
        </Attribute>
        <Attribute
          handleForm={handleForm}
          name="transmissionType"
          value={formInput.transmissionType}
        >
          <datalist id="transmissionType_list">
            <option value="TRANSMISSION_TYPE.YOUTUBE" />
            <option value="TRANSMISSION_TYPE.IFRAME" />
            <option value="TRANSMISSION_TYPE.STREAM" />
            <option value="TRANSMISSION_TYPE.CHANNEL" />
          </datalist>
        </Attribute>

        <Attribute
          name="transmissionSRC"
          value={formInput.transmissionSRC}
          handleForm={handleForm}
        />

        <button
          type="button"
          className="text-white bg-orange-400 p-2 rounded-lg"
          onClick={handleClear}
        >
          LIMPAR
        </button>
      </form>

      <p className="text-white p-4 max-w-full break-words bg-slate-700 rounded-lg">
        {getData()}
      </p>

      <h2 className="text-white text-2xl mt-8">Testing Video</h2>

      {formInput.transmissionType == "TRANSMISSION_TYPE.YOUTUBE" && (
        <YoutubePlayer channelId={formInput.transmissionSRC} />
      )}

      {formInput.transmissionType == "TRANSMISSION_TYPE.STREAM" && (
        <HLSPlayer src={formInput.transmissionSRC} />
      )}

      {formInput.transmissionType == "TRANSMISSION_TYPE.IFRAME" && (
        <IframePlayer src={formInput.transmissionSRC} />
      )}
    </div>
  );
}
