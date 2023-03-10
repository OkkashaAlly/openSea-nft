"use client";

import { useEffect, useState } from "react";

// COMPONENTS
import { H1, H2, H3 } from "@/components/typgraphy";

// CONSTANTS
const API_URL =
  "https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=8";

// ====================================
// Home PAGE COMPONENTS ////////
// ====================================
export default function HomePage() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetching NFTS from openSea testnet API
  const fetchNfts = async () => {
    // request options
    const options = { method: "GET", headers: { accept: "application/json" } };
    // error handling
    const handleError = (err: any) => {
      throw new Error(err);
    };
    try {
      setLoading(true);
      const res = await fetch(API_URL, options);
      const data = await res.json();
      console.log("Response: ", data);

      if (data.detail) handleError(data);

      setNfts(data.orders);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  // fetch nfts once (on page load)
  useEffect(() => {
    (async () => {
      await fetchNfts();
    })();
  }, []);

  console.log(nfts);

  // RETURN ///////////////////////////
  return (
    <div className="p-6 pb-14 px-8 bg-zinc-900 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/*banner */}
        <div className="">
          <Banner />
        </div>
        {/*nfs list */}
        <div className="mt-8 px-1">
          <div className="flex items-baseline flex-col md:flex-row gap-2">
            <H2 styles="text-white">Discover Latest NFTs Collection </H2>
            <small className="text-gray-500 font-light">
              (This is a testnet API please refresh to get good NFTS)
            </small>
          </div>
          <div className="mt-6">
            {loading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
              {nfts && nfts.map((nft: any, i) => <NFTCard key={i} nft={nft} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

////////////////////////////////////////
// EXTENDED COMPONENTS /////////////////
const Banner = () => (
  <div className="relative overflow-hidden flex items-center justify-center h-[200px] rounded-xl bg-gradient-to-r from-pink-500 to-purple-500">
    <div className="absolute w-48 h-48 bg-white opacity-50 rounded-full -top-24 md:-top-9 -left-24 md:-left-12" />

    <div className="flex flex-col items-center text-center justify-center space-y-3">
      <H1 styles="text-white">OpenSea</H1>
      <H2 styles="text-white">The largest NFT marketplace</H2>
    </div>

    <div className="absolute w-72 h-72 bg-white opacity-50 rounded-full -bottom-48 md:-bottom-24 -right-32 md:-right-12" />
  </div>
);

const NFTCard = ({ nft }: { nft: any }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className=" bg-zinc-800 rounded-lg text-white">
        <div className="p-2 pt-3 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nft.maker_asset_bundle.assets[0].image_url}
            alt={nft.maker_asset_bundle.assets[0].name}
            className="w-64 h-80 rounded-lg"
          />
        </div>
        <div className="px-2.5 flex justify-between items-baseline">
          <H3 styles=" text-base">{nft.maker_asset_bundle.assets[0].name}</H3>
          <small className="break-all font-semibold">
            {nft.maker_asset_bundle.assets[0].asset_contract.symbol}
          </small>
        </div>
        <div className="px-2.5 my-3">
          <p className="text-xs text-gray-400">
            {nft.maker_asset_bundle.assets[0].description?.length > 100
              ? nft.maker_asset_bundle.assets[0].description.slice(0, 80) +
                "..."
              : nft.maker_asset_bundle.assets[0].description}
          </p>
        </div>
        <div className="p-2 pb-3">
          <button
            onClick={() => setModal(true)}
            type="button"
            className="text-center text-sm bg-pink-500 rounded-full w-full p-2"
          >
            OPEN
          </button>
        </div>
      </div>
      {/*modal */}
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="text-white max-w-screen-xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-3/4 h-3/4 md:overflow-y-hidden overflow-y-scroll bg-zinc-800 rounded-lg">
            <div className="flex justify-end pr-3">
              <button
                className="text-4xl font-bold text-pink-500"
                onClick={() => setModal(false)}
              >
                &times;
              </button>
            </div>
            {/*body */}
            <div className="flex flex-col gap-3 md:flex-row items-center px-6">
              <div className="flex flex-1 justify-center md:justify-start">
                <div className="">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nft.maker_asset_bundle.assets[0].image_url}
                    alt={nft.maker_asset_bundle.assets[0].name}
                    className="w-64 h-80 md:h-[400px] md:w-[630px]  rounded-lg"
                  />
                </div>
              </div>
              {/*info*/}
              <div className="md:px-4 md:w-1/2">
                <div className="px-2.5 flex flex-col gap-2">
                  <H3 styles=" text-base">
                    Name: {nft.maker_asset_bundle.assets[0].name}
                  </H3>
                  <small className="break-all font-semibold">
                    Symbol:{" "}
                    {nft.maker_asset_bundle.assets[0].asset_contract.symbol}
                  </small>
                  <small className="break-all font-semibold">
                    Address:{" "}
                    {nft.maker_asset_bundle.assets[0].asset_contract.address}
                  </small>
                  <small className="break-all font-semibold">
                    Sales : {nft.maker_asset_bundle.assets[0].num_sales}
                  </small>
                  <small className="break-all font-semibold">
                    Token Schema Type :{" "}
                    {
                      nft.maker_asset_bundle.assets[0].asset_contract
                        .schema_name
                    }
                  </small>
                  <small className="break-all font-semibold">
                    Token Meta Data :{" "}
                    <a
                      href={nft.maker_asset_bundle.assets[0].token_metadata}
                      target="_blank"
                      className="underline text-pink-500"
                    >
                      Click here to open
                    </a>
                  </small>
                </div>
                <div className="px-2.5 my-3">
                  <p className="text-base text-gray-400">
                    Description:{" "}
                    {nft.maker_asset_bundle.assets[0].description?.length > 100
                      ? nft.maker_asset_bundle.assets[0].description.slice(
                          0,
                          80
                        ) + "..."
                      : nft.maker_asset_bundle.assets[0].description}
                  </p>
                </div>
                <div className="p-2 pb-3">
                  <a
                    href={nft.maker_asset_bundle.assets[0].permalink}
                    target="_blank"
                    className="text-center text-sm bg-pink-500 rounded-full block p-2"
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Loader = () => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="animate-spin h-14 w-14"
  >
    <g fill="#ec4899" fillRule="evenodd" clipRule="evenodd">
      <path
        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
        opacity=".2"
      />

      <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
    </g>
  </svg>
);
