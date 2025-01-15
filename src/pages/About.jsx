import React from "react";
import { Contact } from "../assets/icons/Contact";
import { Button } from "../components";

export const About = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">About</h1>
      <div className="prose lg:prose-lg max-w-none text-[#0F1D40]">
        <p className="mb-4 text-lg font-semibold leading-8">
          In a world where markets are prone to crises, Flatty introduces a new
          model—fair, sustainable, and beneficial for all participants. We offer
          a platform that transforms not just the process of buying and selling
          but the very perception of the real estate market. With over 10 years
          of experience in the real estate industry and a strong focus on modern
          technologies, we empower market professionals with tools to streamline
          their work and provide investors with confidence in their decisions.
          Sellers, agents, and buyers operate within a unified ecosystem where
          every step is transparent, and data is grounded in real market
          dynamics. Our mission begins in Northern Cyprus, but our vision
          extends far beyond—to regions ready for change. We believe the market
          can be not only stable but also advantageous for everyone involved.
          Flatty: Building the future of real estate together.
        </p>
        <span className="text-2xl font-semibold leading-9 text-[#4A23A4] ">
          Flatty: Building the future of real estate together.
        </span>
      </div>
      <div className="mt-6 text-right sm:text-center">
        <Button
          variant="primary"
          className="w-[365px] h-[52px]  px-4 py-3 rounded-tl-none rounded-br-none flex items-center justify-center lg:justify-start gap-2 text-white bg-[#8247E5] hover:bg-[#6A3D9A] transition-colors duration-300"
        >
          <Contact />
          Contact Us
        </Button>
      </div>
    </div>
  );
};
