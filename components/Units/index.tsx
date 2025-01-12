"use client";

import Activate from "./Activate";
import Claim from "./Claim";

import cardFrontImage from '@/assets/silvercard-front.svg'
import cardBackImage from '@/assets/silvercard-back.svg'
import Image from 'next/image'

const Units = ({chainId} : {chainId: number}) => {
  return (
    <section className="w-full h-full flex p-20 justify-around m-auto">
      <div className="w-fit h-full flex flex-col">
          <Image
            className="select-none m-0 flex-item"
            src={cardFrontImage}
            alt="Xnode reedeem card front"
          />

          <Image
            className="select-none m-0 flex-item"
            src={cardBackImage}
            alt="Xnode reedeem card back"
          />

      </div>
      <div className="w-3/4 max-w-[600px] h-full text-black">
          {/* Do first step */}
          {/* Do second step */}
          {/* Do third step */}

          <Claim chainId={chainId} />


          {/* TODO: Move this out! This needs to be on a different page. */}
          {/* <Activate chainId={chainId} /> */}
      </div>
    </section>
  );
};

export default Units;
