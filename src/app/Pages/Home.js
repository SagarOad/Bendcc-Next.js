"use client";

import React from "react";
import Navbar from "../Sections/Navbar";
import MainSlider from "../Sections/MainSlider";
import MainCards from "../Sections/MainCards";
import SearchEvent from "../Sections/SearchEvent";
import EventSubmission from "../Sections/EventSubmission";
import Sponsors from "../Sections/Sponsors";
import Contact from "../Sections/Contact";
import Footer from "../Sections/Footer";
import Script from "next/script";

const Home = () => {
  return (
    <div>
      <Script src="https://third-party-script.js" async></Script>
      <Script src="https://third-party-script.js" defer></Script>
      <Navbar />
      <MainSlider />
      <MainCards />
      <SearchEvent />
      <EventSubmission />
      <Sponsors />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
