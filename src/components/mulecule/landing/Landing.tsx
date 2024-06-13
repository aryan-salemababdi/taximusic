"use client"
import { useEffect, useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import MusicBar from "../MusicBar/MusicBar";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";

const DynamicMapComponent = dynamic(() => import("@neshan-maps-platform/mapbox-gl-react").then(mod => mod.MapComponent), {
  ssr: false
});

// eslint-disable-next-line react/display-name
const Landing: NextPage = () => {

  return (
    <>
      <Box width="100%" height="50vh">
          <DynamicMapComponent options={{
            mapKey: "web.210273a832c24bb1ba2386af18c742ff",
            mapType: "neshanRasterNight",
            zoom: 14,
            traffic: true,
            poi: true
          }} />
      </Box>
      <Box width="100%">
        <MusicBar />
      </Box>
    </>
  );
};

export default Landing;
